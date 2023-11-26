
var myFullpage = new fullpage('#fullpage', {
  // Navigation
  menu: '#menu',
  lockAnchors: false,
  anchors:['firstPage', 'secondPage'],
  navigation: false,
  navigationPosition: 'right',
  navigationTooltips: ['firstSlide', 'secondSlide'],
  showActiveTooltip: false,
  slidesNavigation: false,
  slidesNavPosition: 'bottom',

  // Scrolling
  css3: true,
  scrollingSpeed: 600,
  autoScrolling: false,
  fitToSection: true,
  fitToSectionDelay: 600,
  scrollBar: false,
  easing: 'easeInOutCubic',
  easingcss3: 'ease',
  loopBottom: false,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  offsetSections: false,
  resetSliders: false,
  fadingEffect: false,
  normalScrollElements: '#element1, .element2',
  scrollOverflow: true,
  scrollOverflowMacStyle: false,
  scrollOverflowReset: false,
  touchSensitivity: 15,
  bigSectionsDestination: null,

  // Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,

  //License Key
  //licenseKey: null,

  // Design
  controlArrows: true,
  controlArrowsHTML: [
      '<div class="fp-arrow"></div>', 
      '<div class="fp-arrow"></div>'
  ],
  verticalCentered: false,
  sectionsColor : ['#ccc', '#fff'],
  paddingTop: '3em',
  paddingBottom: '10px',
  fixedElements: '#header, .footer',
  responsiveWidth: 0,
  responsiveHeight: 0,
  responsiveSlides: false,
  parallax: false,
  parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
  dropEffect: false,
  dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
  waterEffect: false,
  waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
  cards: false,
  cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

  // Custom selectors
  sectionSelector: '.section',
  slideSelector: '.slide',

  lazyLoading: true,
  observer: true,
  credits: { enabled: true, label: 'Made with fullPage.js', position: 'right'},

  // Events
  beforeLeave: function(origin, destination, direction, trigger){},
  onLeave: function(origin, destination, direction, trigger){},
  afterLoad: function(origin, destination, direction, trigger){},
  afterRender: function(){},
  afterResize: function(width, height){},
  afterReBuild: function(){},
  afterResponsive: function(isResponsive){},
  afterSlideLoad: function(section, origin, destination, direction, trigger){},
  onSlideLeave: function(section, origin, destination, direction, trigger){},
  onScrollOverflow: function(section, slide, position, direction){}
});
var data;
var h;
var years;
var dataInitial;
var articleCounts;
var articleCountsArray

d3.text("nyt-metadata-sample.csv").then(function(csvString) {
  // 'csvString' contains the raw CSV file content
  // If you want to parse it into objects after some preprocessing:
  data = d3.csvParse(csvString);
  h = d3.extent(data, d => d.pub_date_year);
  years = h.map(Number);
  dataInitial = data.filter(d => d.pub_date_year == yearFilter);
  articleCounts = d3.rollup(dataInitial, v => v.length, d => d.section_name);
  articleCountsArray = Array.from(articleCounts, ([section_name, count]) => ({ section_name, count}));
  console.log(data);
}).catch(function(error) {
  // Handle any loading errors here
  console.error(error);
});

const height = 600
const width = 900
const margin = ({top: 10, right: 40, bottom:75, left: 40})

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

yearLabel = svg.append('text')
    .attr('class', 'year')
    .attr('x', width - margin.left*6)
    .attr('y', margin.bottom)
    .attr('fill', '#ccc')
    .attr('font-family', 'Arial')
    .attr('font-weight', 500)
    .attr('font-size', 80)
    .text(yearFilter);

 articles = svg
    .selectAll('bar')
    .data(articleCountsArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.section_name) + margin.left)
    .attr("y", (d) => height - margin.bottom - (height - y(d.count)))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.count))
    .attr("fill", (d) => color(d.section_name));

barGroups = svg.selectAll('.bar-group')
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
tooltips = barGroups.append('text')
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

console.log('hello world')