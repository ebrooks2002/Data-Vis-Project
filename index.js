import {Scrubber} from "@mbostock/scrubber"
d3 = require('d3@7');

var nytdata = FileAttachment("nyt-metadata-sample.csv");
var metadata = d3.csvParse(await nytdata.text());
var h = d3.extent(metadata, d => d.pub_date_year)
var years = h.map(Number)
var dataInitial = metaData.filter(d => d.pub_date_year == yearFilter)
const height = 600
const width = 900
const margin = ({top: 10, right: 40, bottom:75, left: 40})
var articleCounts = d3.rollup(dataInitial, v => v.length, d => d.section_name);
var articleCountsArray = Array.from(articleCounts, ([section_name, count]) => ({ section_name, count}));
console.log(articleCounts)
var x = d3.scaleBand()
    .domain(dataInitial.map(d => d.section_name)) // Assuming 'category' is the categorical field
    .range([0, width - margin.left - margin.right])
    .padding(0.1); // Adds some spacing between the bars

var y = d3.scaleLinear()
.domain([0, 36000])
.range([height - margin.bottom, margin.top])
.nice()

var yearFilter = Scrubber(
    d3.range(years[0], years[1] + 1, 1), // min to max years in 1 year increments
    { autoplay: false, delay: 500, loop: false } )

  const svg = d3.create('svg').attr('width', width).attr('height', height);

  svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")  // select all the x axis labels
    .attr("transform", "rotate(-75)")  // rotate the labels by -65 degrees
    .style("text-anchor", "end");  

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

  const yearLabel = svg.append('text')
    .attr('class', 'year')
    .attr('x', width - margin.left*6)
    .attr('y', margin.bottom)
    .attr('fill', '#ccc')
    .attr('font-family', 'Arial')
    .attr('font-weight', 500)
    .attr('font-size', 80)
    .text(yearFilter);

  const articles = svg
    .selectAll('bar')
    .data(articleCountsArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.section_name) + margin.left)
    .attr("y", (d) => height - margin.bottom - (height - y(d.count)))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.count))
    .attr("fill", (d) => color(d.section_name));

const barGroups = svg.selectAll('.bar-group')
  .data(articleCountsArray)
  .enter().append('g')
    .attr('class', 'bar-group');

// Append the rectangles for the bar chart
barGroups.append('rect')
  .attr('class', 'bar')
  .attr('x', d => x(d.section_name) + margin.left)
  .attr('y', d => height - margin.bottom - (height - y(d.count)))
  .attr('width', x.bandwidth())
  .attr('height', d => height - y(d.count))
  .attr('fill', d => color(d.section_name));

// Append text elements that will be used as tooltips, but hide them initially
const tooltips = barGroups.append('text')
  .text(d => `${d.section_name}: ${d.count}`)
  .attr('x', d => x(d.section_name) + margin.left + x.bandwidth() / 2)
  .attr('y', d => y(d.count) - 150)
  .attr('text-anchor', 'middle')
  .attr('fill', 'black')
  .style('visibility', 'hidden')
  .style('font-family', 'Arial', 'sans-serif') 
  .attr('transform', d => `rotate(-90, ${x(d.section_name) + margin.left - 20 + x.bandwidth()/2}, ${y(d.count) - 175})`)

// Show tooltip on mouseover and hide it on mouseout
barGroups
  .on('mouseover', function(event, d) {
    d3.select(this).select('text').style('visibility', 'visible');
  })
  .on('mouseout', function(event, d) {
    d3.select(this).select('text').style('visibility', 'hidden');
  });

  return svg.node();