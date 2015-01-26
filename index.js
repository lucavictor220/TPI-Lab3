var fs      = require('fs')
  , _       = require('underscore')
  , moment  = require('moment');

var articles = JSON.parse(fs.readFileSync("./articles.json"));

_.each(articles, function(article) {
  article.datetime = moment(article.datetime);
});

var last  = moment(_.last(articles).datetime);
var first = moment(_.first(articles).datetime);
var nr_days  = last.diff(first, 'days');

var articles_per_day = articles.length / nr_days;
console.log(articles_per_day);
// 1

var sorted_articles = _.sortBy(articles, function(article){
  return article.datetime.valueOf();
});

var count_articles = _.countBy(sorted_articles, function(article) {
  year  = article.datetime.year();
  month = article.datetime.month();
  day   = article.datetime.date();
  var newdate = moment().year(year).month(month).date(day);
  return newdate.toDate();
});

var data = [];
count_articles = _.pairs(count_articles);
_.each(count_articles, function(article) {
  data.push({date: article[0], nr: article[1]});
});
console.log(data);




// Line Chart

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%a-%b-%d-%Y").parse;

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
    .y(function(d) { return y(d.nr); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

_.each(data, function(d) {
  d.date = parseDate(d.date);
  d.nr   = +d.nr;
});

// d3.tsv("data.tsv", function(error, data) {
//   data.forEach(function(d) {
//     d.date = parseDate(d.date);
//     d.nr = +d.nr;
//   });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.nr; }));

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
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});
