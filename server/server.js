var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var config = require('./config/config');
var port = 8088;

// bodyParser helps to access request body parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// morgan prints requests into the server terminal
app.use(morgan('dev'));

// router
var router = require("./routes")(app);

mongoose.connect(config.database, function(err) {
    if (err) throw err;
});

app.listen(port);
console.log("server running on port " + port);