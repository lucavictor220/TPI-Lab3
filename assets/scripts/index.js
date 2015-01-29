var moment = require("moment");
var _ = require("underscore");
var d3 = require("d3-browserify");
var d3code = require("./d3code")


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

var replaceSymbols = function(articles) {
   _.each(articles, function(article) {
    article.content = article.content.replace(/[!,?.":;]/g, '');
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
  var average_nr_of_article_per_day = averageNumberOfArticlesPerDay(articles);
  console.log(average_nr_of_article_per_day);
  //line chart1
  d3code.drawGraph1(array_articles);


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
    d3code.drawGraph2(array_articles_unimedia, array_articles_timpul);

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
d3code.drawGraph3(average_views_per_month_array);


 var articles_with_video = _.filter(articles, function(article) {
  return article.title.indexOf("video")  >= 0 || article.title.indexOf("Video")  >= 0 ||
    article.title.indexOf("VIDEO")  >= 0;
 });
  //average of views for articles
  var nr_of_views = _.reduce(articles, function(memo, article) {
      return memo + article.views;
    }, 0);
  var average_nr_of_views = nr_of_views / articles.length;
  //average of views for articles with video
  var nr_of_views_for_articles_with_video = _.reduce(articles_with_video, function(memo, article) {
      return memo + article.views;
    }, 0);
  var average_nr_of_views_for_articles_with_video = nr_of_views_for_articles_with_video / articles_with_video.length;
  var articles_that_have_more_average_views = [];
  articles_that_have_more_average_views = _.filter(articles_with_video, function(article) {
    return article.views > average_nr_of_views;
  });
  var Probability = articles_that_have_more_average_views.length / articles_with_video.length * 100;
  console.log("Probability is: " + Probability + "%");
  var element = document.getElementsByClassName('probability')[0];
  element.innerHTML = "Probability is: " + Probability + "%";

  var nr_of_articles_with_video = articles_with_video.length;
  var nr_of_articles_without_video = articles.length - nr_of_articles_with_video;

  articles_with_video = _.map(articles_with_video, function(article) {
  return {
    views:  article.views,
    date:   article.datetime
    }
  });

  articles_with_video = _.groupBy(articles_with_video, function(article) {
  year  = article.date.year();
  month = article.date.month();
  var newdate_timpul = moment().year(year).month(month + 1).date(0).hours(0).minutes(0).seconds(0);
  return newdate_timpul.toDate();
  });

  articles_with_video = _.pairs(articles_with_video);

 _.each(articles_with_video, function(property) {
    property[0] = moment(property[0]).toDate();
  });

  articles_with_video = _.sortBy(articles_with_video, function(property) {
    return property[0];
  });

  var average_views_per_month_of_articles_with_video = [];
  _.each(articles_with_video, function(property) {
    var average_views_per_month = 0;
    average_views_per_month = _.reduce(property[1], function(memo, article) {
      return memo + article.views;
    }, 0);

    average_views_per_month_of_articles_with_video.push({
      "date":   property[0],
      "value4": average_views_per_month / property[1].length
    });
  });


  var articles_without_video = _.filter(articles, function(article) {
  return article.title.indexOf("video")  == -1 && article.title.indexOf("Video")  == -1 &&
    article.title.indexOf("VIDEO")  == -1;
  });

  articles_without_video = _.map(articles_without_video, function(article) {
  return {
    views:  article.views,
    date:   article.datetime
    }
  });
  articles_without_video = _.groupBy(articles_without_video, function(article) {
  year  = article.date.year();
  month = article.date.month();
  var newdate_timpul = moment().year(year).month(month + 1).date(0).hours(0).minutes(0).seconds(0);
  return newdate_timpul.toDate();
  });
  articles_without_video = _.pairs(articles_without_video);

 _.each(articles_without_video, function(property) {
    property[0] = moment(property[0]).toDate();
  });

  articles_without_video = _.sortBy(articles_without_video, function(property) {
    return property[0];
  });

 var average_views_per_month_of_articles_without_video = [];
  _.each(articles_without_video, function(property) {
    var average_views_per_month = 0;
    average_views_per_month = _.reduce(property[1], function(memo, article) {
      return memo + article.views;
    }, 0);

    average_views_per_month_of_articles_without_video.push({
      "date":   property[0],
      "value5": average_views_per_month / property[1].length
    });
  });

  // line chart 4
d3code.drawGraph4(average_views_per_month_of_articles_with_video, average_views_per_month_of_articles_without_video);

var arr_of_articles_with_without_video = [nr_of_articles_with_video,nr_of_articles_without_video];

d3code.drawhistogram(arr_of_articles_with_without_video);


var articles_without_symbols = replaceSymbols(articles);
var split_array_without_symbols = articles_without_symbols.

  debugger

}
