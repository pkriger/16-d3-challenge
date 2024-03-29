// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(censusData) {
    console.log(censusData)
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity; });

    // Step 2: Create scale functions
    // ==============================
    var xmin = d3.min(censusData , d => d.poverty)*.95;
    var xmax = d3.max(censusData , d => d.poverty)*1.05;
    var ymin = d3.min(censusData , d => d.obesity)*.95;
    var ymax = d3.max(censusData , d => d.obesity)*1.05;

    var xLinearScale = d3.scaleLinear()
        .domain([xmin,xmax])
        .range([0,width])
    
    var yLinearScale = d3.scaleLinear()
        .domain([ymin,ymax])
        .range([height, 0])

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "12.5")
        .attr("opacity", ".75")
        .classed("stateCircle", true );
        //.text(d => d.abbr);



    //add state labels to nodes
    var circleText = chartGroup.selectAll()
        .data(censusData)
        .enter()
        .append('text')
        .classed("stateText", true)
        .attr('x', d => xLinearScale(d.poverty))
        .attr('y', d => (yLinearScale(d.obesity)+3))
        .style('font-size', '10px')
        .text(d => d.abbr)
        

    // Step 6: Initialize tool tip
    // ==============================

    // Step 7: Create tooltip in the chart
    // ==============================

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("font-weight", "bold")
      .text("Obesity (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .style("font-weight", "bold")
      .text("Poverty (%)");


  }).catch(function(error) {
    console.log(error);
  });
