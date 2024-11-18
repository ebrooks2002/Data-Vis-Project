  // Define margins and dimensions
  const sbMargin = { top: 50, right: 120, bottom: 100, left: 60 };
  const sbContainer = document.getElementById('stackedbarchart');
  const sbWidth = sbContainer.clientWidth - sbMargin.left - sbMargin.right;
  const sbHeight = (sbContainer.clientHeight || 600) - sbMargin.top - sbMargin.bottom;

  // Create SVG for stacked bar chart
  const sbSvg = d3.select("#stackedbarchart")
      .append("svg")
      .attr("width", sbWidth + sbMargin.left + sbMargin.right)
      .attr("height", sbHeight + sbMargin.top + sbMargin.bottom)
      .append("g")
      .attr("transform", `translate(${sbMargin.left}, ${sbMargin.top})`);

  // Define color scale for sentiments
  const sbColor = d3.scaleOrdinal()
      .domain(["Positive", "Neutral", "Negative"])
      .range(["#03C03C", "#A6A6A6", "#FF333D"]);

  // Load the CSV data
  d3.csv("data/nyt_sentiment_filtered.csv").then(rawData => {
      // Convert Year to number
      rawData.forEach(d => {
          d.Year = +d.Year;
          d.Sentiment = d.Sentiment.split(": ")[1]; // Extract sentiment value
      });

      // Get the list of years
      const years = Array.from(new Set(rawData.map(d => d.Year))).sort((a, b) => a - b);

      // Populate the year dropdown
      const yearSelect = d3.select("#yearSelect");
      yearSelect.selectAll("option")
          .data(years)
          .enter()
          .append("option")
          .text(d => d)
          .attr("value", d => d);

      // Function to update the chart
      const updateBarChart = selectedYear => {
          // Filter data for the selected year
          const yearData = rawData.filter(d => d.Year === +selectedYear);

          // Aggregate data by section and sentiment
          const nestedData = d3.rollup(
              yearData,
              v => v.length,
              d => d.section_name,
              d => d.Sentiment
          );

          // Prepare data in required format
          const sections = Array.from(nestedData.keys());
          const sentiments = ["Positive", "Neutral", "Negative"];

          const data = sections.map(section => {
              const sentimentCounts = nestedData.get(section) || new Map();
              const total = d3.sum(sentiments, s => sentimentCounts.get(s) || 0);
              return {
                  section: section,
                  Positive: (sentimentCounts.get("Positive") || 0) / total * 100,
                  Neutral: (sentimentCounts.get("Neutral") || 0) / total * 100,
                  Negative: (sentimentCounts.get("Negative") || 0) / total * 100,
              };
          });

          // Sort sections alphabetically
          data.sort((a, b) => a.section.localeCompare(b.section));

          // Clear previous content
          sbSvg.selectAll("*").remove();

          // Set up scales
          const x = d3.scaleBand()
              .domain(data.map(d => d.section))
              .range([0, sbWidth])
              .padding(0.2);

          const y = d3.scaleLinear()
              .domain([0, 100])
              .range([sbHeight, 0]);

          // Add X axis
          sbSvg.append("g")
              .attr("transform", `translate(0, ${sbHeight})`)
              .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "rotate(-45)")
              .style("text-anchor", "end");

          // Add Y axis
          sbSvg.append("g")
              .call(d3.axisLeft(y));

          // Stack the data
          const stackedData = d3.stack()
              .keys(sentiments)
              (data);

          // Draw the bars
          sbSvg.selectAll(".serie")
              .data(stackedData)
              .enter().append("g")
              .attr("class", "serie")
              .attr("fill", d => sbColor(d.key))
              .selectAll("rect")
              .data(d => d)
              .enter().append("rect")
              .attr("x", d => x(d.data.section))
              .attr("y", d => y(d[1]))
              .attr("height", d => y(d[0]) - y(d[1]))
              .attr("width", x.bandwidth())
              .append("title")
              .text(function(d) {
                  const sentiment = this.parentNode.__data__.key;
                  const percentage = (d[1] - d[0]).toFixed(2);
                  return `${d.data.section}\n${sentiment}: ${percentage}%`;
              });

          // Add Y axis label
          sbSvg.append("text")
              .attr("class", "axis-label")
              .attr("transform", "rotate(-90)")
              .attr("x", -sbHeight / 2)
              .attr("y", -50)
              .style("text-anchor", "middle")
              .text("Percentage (%)");

          // Add legend
          const legend = sbSvg.selectAll(".legend")
              .data(sentiments)
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", (d, i) => `translate(${sbWidth + 10}, ${i * 25})`);

          legend.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", sbColor);

          legend.append("text")
              .attr("x", 25)
              .attr("y", 14)
              .style("text-anchor", "start")
              .text(d => d);
      };
      // Initial render with the first available year
      updateBarChart(years[0]);

      // Update chart when year changes
      yearSelect.on("change", function () {
          const selectedYear = this.value;
          updateBarChart(selectedYear);
      });
  }).catch(error => {
      console.error('Error loading or processing data:', error);
  });