module.exports = function (app) {
    require('./site.routes')(app)
    require('./user.routes')(app)
};
