var express = require('express');
var router = express.Router();
var User = require("../models/user");
var mwAuth = require("../middlewares/auth");

// route to return all users (GET http://localhost:8080/api/users)
router.get('/', mwAuth.authenticate, mwAuth.authorize, function(req, res) {
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