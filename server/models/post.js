var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Post', PostSchema);