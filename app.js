var express = require('express');
var app = express();

app.set("title", "TPI Lab3");
app.set("view engine", "jade");

app.use(express["static"]("public"));
app.use('/', require('./routes/index'));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listening at http://" + host + ":" + port);
});
