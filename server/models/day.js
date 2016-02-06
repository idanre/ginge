var Post = require("../models/post");

module.exports.getDays = function(start, end) {
    var promise = Post.aggregate([
         {
             $match: {day: {$gte: new Date(start.format()), $lte: new Date(end.format())}}
         },
         {
             $group: {
                 _id: {$dateToString: {format: "%d-%m-%Y", date: "$day"}},
                 average: {$avg: "$rank"}
             }
         },
         {
             $sort: {_id: 1}
         }
     ]).exec();
    return promise;
}