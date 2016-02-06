module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/users', require('./users'));
    app.use('/days', require('./days'));
    app.use('/posts', require('./posts'));
    app.use('/auth', require('./auth'));
};