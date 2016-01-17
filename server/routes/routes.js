var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('../config/config.json');
var router = express.Router();
var Post = require("../models/post");
var User = require("../models/user");

/* auth */

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      res.json({ success: false, message: 'Authentication failed.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

// route middleware to verify a token
var auth = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}


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

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', auth, function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


/* setup */
router.get('/setup', function(req, res) {

  // create a sample user
  var admin = new User({
    name: 'admin',
    password: 'admin',
    admin: true
  });

  // save the sample user
  admin.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;