var express = require('express');
var router = express.Router();
var Day = require("../models/day");
var moment = require("moment");

router.route("/")
  // get posts between start to end date
  .get(function(req, res) {
    var start, end;
    if (req.query.start && req.query.end) {
      start = moment(req.query.start, "D-M-YYYY");
      end = moment(req.query.end, "D-M-YYYY");
      if (start.format() == "Invalid date" || end.format() == "Invalid date") {
        // invalid param
        res.sendStatus(500);
      }
      end.endOf("day");
      Day.getDays(start, end).then(function(days){
        var resObj;
        resObj = days.reduce(function(prev, curr){
          prev[curr._id] = curr;
          return prev;
        }, {});
        console.log(resObj);

        res.send(resObj);
      });
    } else {
      // missing param
      res.sendStatus(500);
    }
  });
module.exports = router;