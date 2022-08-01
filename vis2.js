// --------------------------------------------------------------------------------// 
// D3 Code for CS 498 Final Project - By Bo Hu bo12@illinois.edu
// --------------------------------------------------------------------------------// 

// --------------------------------------------------------------------------------// 
// SETUP --------------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 

// Retrieve the scenes
var scene1 = d3.select('#scene1')
var scene2 = d3.select('#scene2')
var scene3 = d3.select('#scene3')
var scene4 = d3.select('#scene4')

// constants
var margin = { top: 10, right: 100, bottom: 50, left: 100 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// color definition

var color = d3.scaleOrdinal()
      .domain(["audi", "ford", "volkswagen"])
      .range([ "#402D54", "#D18975", "#8FD175"])

var square = d3.symbol().type(d3.symbolSquare).size(10);

// axis labels
scene1.append('text')
    .attr('x', 100)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('Price')

scene1.append('text')
    .attr('x', 500)
    .attr('y', 550)
    .attr('text-anchor', 'middle')
    .text('Mileage')

scene2.append('text')
    .attr('x', 100)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('Price')

scene2.append('text')
    .attr('x', 500)
    .attr('y', 550)
    .attr('text-anchor', 'middle')
    .text('Manufacture Year')


scene3.append('text')
    .attr('x', 100)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('Price')

scene3.append('text')
    .attr('x', 500)
    .attr('y', 550)
    .attr('text-anchor', 'middle')
    .text('Mileage')


// --------------------------------------------------------------------------------// 
// SCENE ONE ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 
var size = 20;

var highlight = function (p) {
    scene1.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene1.selectAll("legend").style("opacity", 1)
    scene2.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene2.selectAll("legend").style("opacity", 1)
    scene4.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene4.selectAll("legend").style("opacity", 1)
}

var noHighlight = function (d) {
    d3.selectAll("circle").style("opacity", 1)
}

var keys_cyls = ["audi", "ford", "volkswagen"]

var bar_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")

scene1.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("circle")
    .attr("cy", 10)
    .attr("cx", function (d, i) { return 200 + i * (size + 225) })
    .attr("r", 10)
    .attr("stroke", "black")
    .style("fill", function (d) { return color(d) })
    .on("mouseover", function (d) { highlight(d) })
    .on("mouseleave", function (d) { noHighlight(d) })

scene1.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", function (d, i) { return 220 + i * (size + 225) })
    .attr("y", 10)
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

async function load1() {
    d3.csv("https://raw.githubusercontent.com/PinkStarFishSea/DataVisualization.github.io/main/secondcar.csv").then(function (data_given) {


        var xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, 200000])

        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([1000, 105000])

        var x1Axis = d3.axisBottom(xScale);
        var y1Axis = d3.axisLeft(yScale);

        scene1.append("g")
            .attr("transform", "translate(100,50)")
            .call(y1Axis)
        scene1.append("g")
            .attr("transform", "translate(100,490)")
            .call(x1Axis);


        scene1.append("g")
            .attr("transform", "translate(100,50)")
            .selectAll("circle")
            .data(data_given)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) { return  xScale(d.mileage); })
            .attr("cy", function (d, i) { return  yScale(d.price) - 10; })
            .attr("r", 5)
            .style("fill", function(d){ return color(d.maker); })
            .on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.maker + "</br>"  + d.model + "</br>"  + " Mileage: " + d.mileage + "</br>"  + "Price: " + d.price + "</br>" + "Manufacture Year: " +  d.manufacture_year)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

// This function is called by the buttons on top of the plot
function change(setting) {
    if (setting === "AverageHighwayMPG") {
        scene1.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("fill", "#5E4FA2")
            .attr("y", function (d, i) { return y(highway_mpgs[i]) + 10; })
            .attr("height", function (d, i) { return height - y(highway_mpgs[i]); })
    } else {
        scene1.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("fill", "#66C2A5")
            .attr("y", function (d, i) { return y(city_mpgs[i]) + 10; })
            .attr("height", function (d, i) { return height - y(city_mpgs[i]); })
    }
}

// --------------------------------------------------------------------------------// 
// SCENE TWO ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// 
var size = 20;

var highlight = function (p) {
    scene2.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene2.selectAll("legend").style("opacity", 1)
    scene1.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene1.selectAll("legend").style("opacity", 1)
}

var noHighlight = function (d) {
    d3.selectAll("circle").style("opacity", 1)
}

var keys_cyls = ["audi", "ford", "volkswagen"]

scene2.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("circle")
    .attr("cy", 10)
    .attr("cx", function (d, i) { return 200 + i * (size + 225) })
    .attr("r", 10)
    .attr("stroke", "black")
    .style("fill", function (d) { return color(d) })
    .on("mouseover", function (d) { highlight(d) })
    .on("mouseleave", function (d) { noHighlight(d) })

scene2.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", function (d, i) { return 220 + i * (size + 225) })
    .attr("y", 10)
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

async function load2() {
    d3.csv("https://raw.githubusercontent.com/PinkStarFishSea/DataVisualization.github.io/main/secondcar.csv").then(function (data_given) {


        var x2Scale = d3.scaleLinear()
            .range([0, width])
            .domain([1960, 2020])

        var y2Scale = d3.scaleLinear()
            .range([height, 0])
            .domain([1000, 105000])

        var x2Axis = d3.axisBottom(x2Scale);
        var y2Axis = d3.axisLeft(y2Scale);

        scene2.append("g")
            .attr("transform", "translate(100,50)")
            .call(y2Axis)
        scene2.append("g")
            .attr("transform", "translate(100,490)")
            .call(x2Axis);


        scene2.append("g")
            .attr("transform", "translate(100,50)")
            .selectAll("circle")
            .data(data_given)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) { return  x2Scale(d.manufacture_year); })
            .attr("cy", function (d, i) { return  y2Scale(d.price) - 10; })
            .attr("r", 5)
            .style("fill", function(d){ return color(d.maker); })
            .on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.maker + "</br>"  + d.model + "</br>"  + " Mileage: " + d.mileage + "</br>"  + "Price: " + d.price + "</br>" + "Manufacture Year: " +  d.manufacture_year)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}


// --------------------------------------------------------------------------------// 
// SCENE THREE ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// ////




async function load3() {
    d3.csv("https://raw.githubusercontent.com/PinkStarFishSea/DataVisualization.github.io/main/secondcar.csv").then(function (data_given) {


        var xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, 200000])

        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([1000, 105000])

        var x1Axis = d3.axisBottom(xScale);
        var y1Axis = d3.axisLeft(yScale);

        scene3.append("g")
            .attr("transform", "translate(100,50)")
            .call(y1Axis)
        scene3.append("g")
            .attr("transform", "translate(100,490)")
            .call(x1Axis);


        scene3.append("g")
            .attr("transform", "translate(100,50)")
            .selectAll("circle")
            .data(data_given)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) { return  xScale(d.mileage); })
            .attr("cy", function (d, i) { return  yScale(d.price) - 10; })
            .attr("r", 5)
            .style("fill", function(d){ return color(d.maker); })
            .on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.maker + "</br>"  + d.model + "</br>"  + " Mileage: " + d.mileage + "</br>"  + "Price: " + d.price + "</br>" + "Manufacture Year: " +  d.manufacture_year)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

// This function is called by the buttons on top of the plot
function change(setting) {
    if (setting === "audi") {
	var coloraudi = d3.scaleOrdinal()
      .domain(["audi", "ford", "volkswagen"])
	    .range([ "#402D54", "#ffffff", "#ffffff"])
	
        scene3.selectAll("circle")
            .transition()
            .duration(2000)
            .style("fill",function(d){ return coloraudi(d.maker); }) 
    } else if (setting === "ford"){

     var colorford = d3.scaleOrdinal()
      .domain(["audi", "ford", "volkswagen"])
      .range([ "#ffffff", "#D18975", "#ffffff"])

        scene3.selectAll("circle")
	            .transition()
            .duration(2000)
            .style("fill", function(d){ return colorford(d.maker); })

    } else {

     var colorvolk = d3.scaleOrdinal()
      .domain(["audi", "ford", "volkswagen"])
      .range([ "#ffffff", "#ffffff", "#8FD175"])

        scene3.selectAll("circle")
	            .transition()
            .duration(2000)
            .style("fill", function(d){ return colorvolk(d.maker); })

    }
}


// --------------------------------------------------------------------------------// 
// SCENE FOUR ----------------------------------------------------------------------//
// --------------------------------------------------------------------------------// ////

var highlight = function (p) {
    scene4.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene4.selectAll("legend").style("opacity", 1)
    scene1.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene1.selectAll("legend").style("opacity", 1)
    scene4.selectAll("circle").filter( function(d) { return d.maker != null & d.maker != p; }).style("opacity", .05)
    scene4.selectAll("legend").style("opacity", 1)
}

var noHighlight = function (d) {
    d3.selectAll("circle").style("opacity", 1)
}

var keys_cyls = ["audi", "ford", "volkswagen"]

scene4.selectAll("legend")
    .data(keys_cyls)
    .enter()
    .append("circle")
    .attr("cy", 10)
    .attr("cx", function (d, i) { return 200 + i * (size + 225) })
    .attr("r", 10)
    .attr("stroke", "black")
    .style("fill", function (d) { return color(d) })
    .on("mouseover", function (d) { highlight(d) })
    .on("mouseleave", function (d) { noHighlight(d) })

scene4.selectAll("labels")
    .data(keys_cyls)
    .enter()
    .append("text")
    .attr("x", function (d, i) { return 220 + i * (size + 225) })
    .attr("y", 10)
    .style("fill", function (d) { return "black" })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight)

async function load4() {
    d3.csv("https://raw.githubusercontent.com/PinkStarFishSea/DataVisualization.github.io/main/secondcar.csv").then(function (data_given) {


        var x2Scale = d3.scaleLinear()
            .range([0, width])
            .domain([1960, 2020])

        var y2Scale = d3.scaleLinear()
            .range([height, 0])
            .domain([1000, 105000])


        var x2Axis = d3.axisBottom(x2Scale);
        var y2Axis = d3.axisLeft(y2Scale);

        scene4.append("g")
            .attr("transform", "translate(100,50)")
            .call(y2Axis)
        var x4Axis = scene4.append("g")
            .attr("transform", "translate(100," + height + ")")
            .call(x2Axis);


	  var clip = scene4.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

	 var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

	 var scatter = scene4.append('g')
    .attr("clip-path", "url(#clip)")

        scatter.append("g")
            .attr("transform", "translate(100,50)")
            .selectAll("circle")
            .data(data_given)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) { return  x2Scale(d.manufacture_year); })
            .attr("cy", function (d, i) { return  y2Scale(d.price) - 10; })
            .attr("r", 5)
            .style("fill", function(d){ return color(d.maker); })
            .on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.maker + "</br>"  + d.model + "</br>"  + " Mileage: " + d.mileage + "</br>"  + "Price: " + d.price + "</br>" + "Manufacture Year: " +  d.manufacture_year)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

	scatter.append("g")
              .attr("class", "brush")
	      .call(brush);

	// A function that set idleTimeOut to null
        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart() {

              extent = d3.event.selection

             // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
           if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
           x.domain([1960,2020])
        } else {
           x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
           scene4.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

    // Update axis and circle position
    x4Axis.transition().duration(10).call(d3.axisBottom(x))
    scatter.selectAll("circle")
          .transition().duration(10)
		.attr("cx", function (d) { return x2Scale(d.manufacture_year); } )
		.attr("cy", function (d) { return y2Scale(d.price)- 10; } )

    }

	
    })
}

