// @TODO: YOUR CODE HERE!
// Load the data from csv
var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 50
}; 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create an svg wrapper

var svg = d3.select(".chart")
    
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);
   //.attr("class", "d3-tip")
   //.style("opacity", 0);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
//Import Data

d3.csv("data.csv").then(function(healthdata) {
   // var parseTime = d3.timeParse("%d-%b");

    healthdata.forEach(function (data) {
        //data.date = parseTime(data.date);
       data.healthcare = +(data.healthcare);
       data.poverty = +(data.poverty);
       //return data;
   })
// Create Scales
var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.poverty)])
    .range([0, width]);
var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([height, 0]);

// Create Axis
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append Axis to the chart
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
chartGroup.append("g")
    .call(leftAxis)

// Create circles
var circleGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", "0.5");

// append text to all circle in a chart
var circleGroup = chartGroup.selectAll()
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr))


// Initialize tooltip
var toolTip = d3.tip()
    .attr("class","tooltip")
    .offset([80, -60])
    .html(function(d){
        return (`${d.abbr}<br> Healthcare: ${d.healthcare}<br> Poverty: ${d.poverty}`)
    });
// create tooltip in a chart
chartGroup.call(tooTip) 
// create event listener
circleGroup.on("mouseover", function(data){
    toolTip.show(data,this);
})

circleGroup.on("mouseout", function(data) {
    toolTip.hide(data);
})

//create X- Axis labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("In poverty(%)");
// Create Y-Axis labels
chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top +30})`)
.attr("class", "axisText")
.text("Lacks Healthcare(%)");
}).catch(function(error) {
console.log(error);
})