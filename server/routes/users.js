var express = require('express');
var router = express.Router();
var User = require("../models/user");
var mwAuth = require("../middlewares/auth");
var bcrypt = require('bcrypt');

// route to return all users (GET http://localhost:8080/api/users)
router.get('/', mwAuth.authenticate, mwAuth.authorize, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

/* setup */
router.get('/setup', function(req, res) {
    var admin = new User({
            name: 'admin',
            admin: true
        });
    User.remove({}, function(err){ if (err) throw err; });

    bcrypt.hash('admin', 10, function(err, hashedPass) {
        if (err) throw err;

        admin.password = hashedPass;
        admin.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
            res.json({ success: true });
        });
    });
});

module.exports = router;