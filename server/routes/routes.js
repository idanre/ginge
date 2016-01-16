var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* posts */
router.route("/posts")
    .post(function(req, res){
        var post = new Post();
        post.title = req.body.title;
        post.save(function(err){
            if (err){
                res.send(err);
            }
            res.json({message: "Post created."});
        });
    })

    .get(function(req, res){
       Post.find(function(err, posts){
          if (err){
              res.send(err);
          }
           res.json(posts);
       });
    });

module.exports = router;