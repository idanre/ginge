var jwt    = require('jsonwebtoken');
var config = require('../config/config');

// route middleware to verify a token
module.exports = {
    authenticate: function(req, res, next) {
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
                    console.log('Authenticated.');
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
    },
    authorize: function(req, res, next) {
        if (8 === 8) {
            console.log('Authorized.');
            next();
        } else {
            console.log('Unauthorized');
            return res.status(403).send({
                success: false,
                message: 'Unauthorized.'
            });
        }
    }
}