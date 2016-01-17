var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var config = require('./config/config.json');
var port = 8088;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


var router = require("./routes/routes");
app.use('/', router);

var Post = require("./models/post");

mongoose.connect(config.database);

app.listen(port);
console.log("server running on port " + port);