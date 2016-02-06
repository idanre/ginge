var faker = require('faker');
var Post = require("../models/post");
var startAt = "1-1-2016";
var mongoose = require("mongoose");
var moment = require('moment');
var config = require('../config/config');
var startOfDay, endOfDay, numOfPosts, day, month, j, post;

mongoose.connect(config.database, function(err) {
    if (err) throw err;
});

// clear posts collection
Post.remove({}, function(err) {
    if (err) throw err;
});

startOfDay = moment(startAt, "D-M-YYYY");
endOfDay = moment(startAt, "D-M-YYYY");
endOfDay.endOf("day");
month = startOfDay.month();
// generate 0-3 posts per day in the selected month
while(startOfDay.month() == month){
    numOfPosts = faker.random.number(3);
    for(j=0; j<numOfPosts; j++) {
        post = new Post({
            day: faker.date.between(new Date(startOfDay.format()), new Date(endOfDay.format())),
            title: faker.lorem.sentence(3,0),
            rank: faker.random.number({min:1, max: 5})
        });
        post.save(function(err, p){
            if (err) throw err;
            console.log("created "+ p.day);
        });
    }
    startOfDay.add(1, "day");
    endOfDay.add(1, "day");
}