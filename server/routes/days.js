var express = require('express');
var router = express.Router();
var Post = require("../models/post");

router.route("/")
  // get posts between start to end date
  .get(function(req, res) {
    var start, end;
    if (req.query.start && req.query.end) {
      start = new Date(req.query.start);
      end = new Date(req.query.end);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        res.sendStatus(501);
      }
      res.json({ start: start, end: end });
    } else {
      res.sendStatus(500);
    }
  });
module.exports = router;