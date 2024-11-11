

// Set dimensions based on container size
const treemapContainer = document.getElementById('treemap');
const width = treemapContainer.clientWidth;
const height = treemapContainer.clientHeight;

// Create SVG for treemap
const svg = d3.select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load the CSV data
d3.csv("data/treemap2000-11.csv").then(data => {
    // Convert numerical columns from strings to numbers
    data.forEach(d => {
        d['Count of nyt-metadata-cleaned-3.csv'] = +d['Count of nyt-metadata-cleaned-3.csv'];
        d['Year'] = +d['Year'];
    });

    // Extract and sort unique years for the dropdown
    const years = Array.from(new Set(data.map(d => d.Year))).sort((a, b) => a - b);
    const yearFilter = d3.select("#year");
    years.forEach(year => {
        yearFilter.append("option").text(year).attr("value", year);
    });

    // Function to update the treemap based on selected year
    function updateTreemap(selectedYear) {
        const filteredData = data.filter(d => d.Year == selectedYear);

        // Get max article count for color scaling
        const maxCount = d3.max(filteredData, d => d['Count of nyt-metadata-cleaned-3.csv']);

        // Define a color scale using a gradient (e.g., shades of blue)
        const colorScale = d3.scaleSequential()
            .domain([0, maxCount])
            .interpolator(d3.interpolateBlues);

        // Group data by section name and calculate total article count
        const sectionCounts = filteredData.map(d => ({
            name: d['Section Name'],
            value: d['Count of nyt-metadata-cleaned-3.csv']
        }));

        // Set up hierarchy and treemap layout
        const root = d3.hierarchy({ children: sectionCounts })
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        d3.treemap()
            .size([width, height])
            .padding(2)(root);

        // Bind data and create groups for each rectangle and label
        const nodes = svg.selectAll("g")
            .data(root.leaves(), d => d.data.name);

        nodes.exit().remove();

        const nodeEnter = nodes.enter().append("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        // Append rectangles
        nodeEnter.append("rect")
            .attr("class", "treemap-rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .style("fill", d => colorScale(d.value));

        // Append text labels
        nodeEnter.append("text")
            .attr("class", "label")
            .attr("x", d => (d.x1 - d.x0) / 2)
            .attr("y", d => (d.y1 - d.y0) / 2)
            .text(d => `${d.data.name}: ${d.value}`)
            .call(wrapText, d => d.x1 - d.x0);

        // Update positions of existing nodes
        nodes.transition().duration(500)
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        nodes.select("rect")
            .transition().duration(500)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .style("fill", d => colorScale(d.value));

        nodes.select(".label")
            .transition().duration(500)
            .attr("x", d => (d.x1 - d.x0) / 2)
            .attr("y", d => (d.y1 - d.y0) / 2)
            .text(d => `${d.data.name}: ${d.value}`)
            .call(wrapText, d => d.x1 - d.x0);

        // Add hover tooltip
        nodeEnter.append("title")
            .text(d => `${d.data.name}\nArticles: ${d.value}`);
    }

    // Initial render with the first available year
    updateTreemap(years[0]);

    // Update the treemap when year filter changes
    yearFilter.on("change", () => {
        const selectedYear = yearFilter.property("value");
        updateTreemap(selectedYear);
    });
});

// Function to wrap text within a given width
function wrapText(text, widthFunc) {
    text.each(function (d) {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            width = widthFunc(d),
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
        var word;
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width - 10) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + "em")
                    .text(word);
            }
        }
    });
}