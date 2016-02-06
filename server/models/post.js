var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    day: Date,
    title: String,
    rank: Number
});

module.exports = mongoose.model('Post', PostSchema);