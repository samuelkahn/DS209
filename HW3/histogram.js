function histogramChart() {
  var margin = {top: 0, right: 0, bottom: 40, left: 14},
      width = 960,
      height = 500;

  var histogram = d3.layout.histogram(),
      x = d3.scale.ordinal(),
      y = d3.scale.linear(),
      xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom")
                      .tickSize(10, 3);
      yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .ticks(10);
      console.log(xAxis)
  function chart(selection) {
    selection.each(function(data) {

      // Compute the histogram.
      data = histogram.bins(19)(data);

      // Update the x-scale.
      x   .domain(data.map(function(d) { return d.x; }))    
          .rangeRoundBands([0,  960],.05);
      // Update the y-scale.
      y   .domain([0, d3.max(data, function(d) { return d.y; })])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "x axis");


      //// Titlte
      svg.append("text")
      .attr("x", 500)
      .attr("y",25 )
      .style("text-anchor", "middle")
      .text("Histogram of Git Commits Per Work Day");


      //// Titlte
      svg.append("text")
      .attr("x", 500)
      .attr("y",495 )
      .style("text-anchor", "middle")
      .text("Git Commits Per Work Day");
      // Update the outer dimensions.




      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar").data(data);
      bar.enter().append("rect");
      bar.exit().remove();
      bar .attr("width", x.rangeBand())
          .attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return y.range()[0] - y(d.y); })
         
      console.log(y.range()[0])
      svg.attr("width", width)
        .attr("height", height);

      // Create Y Axis
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 20 + ",0)")
        .call(yAxis);
      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + y.range()[0] + ")")
          .call(xAxis);
    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  // Expose the histogram's value, range and bins method.
  d3.rebind(chart, histogram, "value", "range", "bins");

  // Expose the x-axis' tickFormat method.
  d3.rebind(chart, xAxis, "tickFormat");

  return chart;
}