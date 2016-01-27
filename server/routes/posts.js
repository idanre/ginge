var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* posts */
router.route("/")
    // Create
    .post(function(req, res){
        var post = new Post();
        post.title = req.body.title;
        post.save(function(err){
            if (err) res.send(err)
            res.json({message: "Post created."});
        });
    })
    // Get all
    .get(function(req, res){
        Post.find(function(err, posts){
            if (err) res.send(err)
            res.jsonp(posts);
        });
    });
router.route("/:post_id")
    // Get one
    .get(function(req, res){
        Post.findById(req.params.post_id, function(err, post){
            if (err) res.send(err);
            res.json(post);
        });
    })
    // Update one
    .put(function(req, res){
        Post.findById(req.params.post_id, function(err, post){
            if (err) res.send(err);
            if (req.body.title){
                post.title = req.body.title;
            }
            post.save(function(err, post){
                if (err) res.send(err);
                res.json({message: "Updated successfully."});
            });
        });
    })
    // Delete one
    .delete(function(req, res){
        Post.remove({_id: req.params.post_id}, function(err, result){
            var message;
            if (err) res.send(err);
            message = result["result"]["n"] > 0 ? "Deleted successfully." : "Nothing to delete."
            res.json({message: message});
        });
    });

module.exports = router;