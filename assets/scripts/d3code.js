var moment = require("moment");
var d3 = require("d3-browserify");

var exports = module.exports = {};

exports.drawGraph1 = function(articles) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

  var svg = d3.select("div.first").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(articles, function(d) { return d.date; }));
    y.domain(d3.extent(articles, function(d) { return d.value; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("articles");

    svg.append("path")
        .datum(articles)
        .attr("class", "line")
        .attr("d", line);

}

exports.drawGraph2 = function(articles_unimedia, articles_timpul) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line1 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value1); });
  var line2 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value2); });

  var svg = d3.select("div.second").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(articles_unimedia, function(d) { return d.date; }));
    y.domain(d3.extent(articles_unimedia, function(d) { return d.value1; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("articles");

    svg.append("path")
        .datum(articles_unimedia)
        .style("stroke", "green")
        .attr("class", "line")
        .attr("d", line1);

    svg.append("path")
        .datum(articles_timpul)
        .style("stroke", "red")
        .attr("class", "line")
        .attr("d", line2);

}

exports.drawGraph3 = function(average_views) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line3 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value3); });

  var svg = d3.select("div.third")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(average_views, function(d) { return d.date; }));
    y.domain(d3.extent(average_views, function(d) { return d.value3; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("views");

    svg.append("path")
        .datum(average_views)
        .attr("class", "line")
        .style("stroke", "yellow")
        .attr("d", line3);

}

exports.drawGraph4 = function(articles_with_video, articles_without_video) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line4 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value4); });
  var line5 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value5); });

  var svg = d3.select("div.fourth").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(articles_without_video, function(d) { return d.date; }));
    y.domain(d3.extent(articles_with_video, function(d) { return d.value4; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("views");

    svg.append("path")
        .datum(articles_with_video)
        .style("stroke", "red")
        .attr("class", "line")
        .attr("d", line4);

    svg.append("path")
        .datum(articles_without_video)
        .style("stroke", "blue")
        .attr("class", "line")
        .attr("d", line5);

}

exports.drawhistogram = function(array) {

var w = 600,
    h = 100,
    barPadding = 5,
    xoffset = 50,
    yoffset = 400,
    heightScale = 1 / 70;

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("div.fifth").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bars = svg.selectAll("rect")
     .data(array);
     bars.enter()
     .append("rect");

     bars.attr("x", function(d, i) {
        return i * (w / array.length)+ xoffset;

     })
     .attr("y", function(d){
        return h + yoffset - d*heightScale;
     })
     // Less bars == more width
     .attr("width", w / array.length - barPadding)
     .attr("height", function(d){
        var barHeight = d*heightScale;
        return barHeight;
     })

     .attr("fill", "teal");
}