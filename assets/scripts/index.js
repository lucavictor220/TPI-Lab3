var moment = require("moment");
var _ = require("underscore");
var d3 = require("d3-browserify");
var nvd3 = require("nvd3");

d3.json("articles.json", function(error, json) {
  if (error) return console.warn(error);
  var articles = parseData(json);
  var average = averageNumberOfArticlesPerDay(articles);
  visualization(json);
});

var parseData = function(articles) {
  _.each(articles, function(article) {
    article.datetime = moment(article.datetime);
  });
  return articles;
}
var divideArticles = function(articles) {
  return _.groupBy(articles, function(article) {
    return article.source;
  });
}

var averageNumberOfArticlesPerDay = function(articles) {
  var last  = moment(_.last(articles).datetime);
  var first = moment(_.first(articles).datetime);
  var nr_days  = last.diff(first, 'days');

  return articles.length / nr_days;
}

var sortArticles = function(articles) {
  return _.sortBy(articles, function(article) {
    return article.datetime.toDate();
  });
}

var visualization = function(articles) {

  var sorted_articles  = sortArticles(articles);

  var counted_articles_per_month = _.countBy(sorted_articles, function(article) {
    year  = article.datetime.year();
    month = article.datetime.month();
    var newdate = moment().year(year).month(month).date(0).hours(0).minutes(0).seconds(0);
    return newdate.toDate();
  });

  var array_articles = [];
  counted_articles_per_month = _.pairs(counted_articles_per_month);
  _.each(counted_articles_per_month, function(article) {
    array_articles.push({
      "date":   moment(article[0]).toDate(),
      "value":  article[1]
    });
  });

  //line chart1

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

    x.domain(d3.extent(array_articles, function(d) { return d.date; }));
    y.domain(d3.extent(array_articles, function(d) { return d.value; }));

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
        .datum(array_articles)
        .attr("class", "line")
        .attr("d", line);


  var unimedia = _.where(sorted_articles, {source : "unimedia"});
  var timpul   = _.where(sorted_articles, {source : "timpul"});

  var counted_articles_per_month_unimedia = _.countBy(unimedia, function(article) {
    year  = article.datetime.year();
    month = article.datetime.month();
    var newdate_unimedia = moment().year(year).month(month).date(0).hours(0).minutes(0).seconds(0);
    return newdate_unimedia.toDate();
  });

  var counted_articles_per_month_timpul = _.countBy(timpul, function(article) {
    year  = article.datetime.year();
    month = article.datetime.month();
    var newdate_timpul = moment().year(year).month(month).date(0).hours(0).minutes(0).seconds(0);
    return newdate_timpul.toDate();
  });

  var array_articles_unimedia = [];
  counted_articles_per_month_unimedia = _.pairs(counted_articles_per_month_unimedia);
  _.each(counted_articles_per_month_unimedia, function(article) {
    array_articles_unimedia.push({"date" : moment(article[0]).toDate(), "value1" : article[1]});
  });

  var array_articles_timpul = [];
  counted_articles_per_month_timpul = _.pairs(counted_articles_per_month_timpul);
  _.each(counted_articles_per_month_timpul, function(article) {
    array_articles_timpul.push({"date" : moment(article[0]).toDate(), "value2" : article[1]});
  });


  //line chart2
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

    x.domain(d3.extent(array_articles_unimedia, function(d) { return d.date; }));
    y.domain(d3.extent(array_articles_unimedia, function(d) { return d.value1; }));

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
        .datum(array_articles_unimedia)
        .style("stroke", "green")
        .attr("class", "line")
        .attr("d", line1);

    svg.append("path")
        .datum(array_articles_timpul)
        .style("stroke", "red")
        .attr("class", "line")
        .attr("d", line2);


  var new_array = _.map(articles, function(article) {
    return {
      views:  article.views,
      date:   article.datetime
    }
  });

  var grouped_by_month = _.groupBy(new_array, function(article) {
    year  = article.date.year();
    month = article.date.month();
    var newdate_timpul = moment().year(year).month(month + 1).date(0).hours(0).minutes(0).seconds(0);
    return newdate_timpul.toDate();
  });


  grouped_by_month = _.pairs(grouped_by_month);

  _.each(grouped_by_month, function(property) {
    property[0] = moment(property[0]).toDate();
  });

  var sorted_by_month = _.sortBy(grouped_by_month, function(property) {
    return property[0];
  });

  var average_views_per_month_array = [];
  _.each(sorted_by_month, function(property) {
    var average_views_per_month = 0;
    average_views_per_month = _.reduce(property[1], function(memo, article) {
      return memo + article.views;
    }, 0);

    average_views_per_month_array.push({
      "date":   property[0],
      "value3": average_views_per_month / property[1].length
    });
  });

  // line chart 3

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

    x.domain(d3.extent(average_views_per_month_array, function(d) { return d.date; }));
    y.domain(d3.extent(average_views_per_month_array, function(d) { return d.value3; }));

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
        .datum(average_views_per_month_array)
        .attr("class", "line")
        .style("stroke", "yellow")
        .attr("d", line3);
}