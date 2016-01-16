var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = require("./routes/routes");
app.use('/', router);

var Post = require("./models/post");

mongoose.connect("mongodb://localhost:27017/ginge");

app.listen(port);
console.log("server running on port " + port);