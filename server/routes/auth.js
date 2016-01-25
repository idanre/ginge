var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config/config');
var User = require("../models/user");
var bcrypt = require('bcrypt');

// route to authenticate a user (POST http://localhost:8080/api/login)
router.post('/login', function(req, res) {

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
            if (!bcrypt.compareSync(req.body.password, user.password)) {
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

module.exports = router;