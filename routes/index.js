var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('layout', {
    title: req.app.get("title")
  });
});

module.exports = router;
