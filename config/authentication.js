'use strict'
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('./config');

var Authentication = function (user) {
    if (user) {
        this.key = user.key;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.salt = user.salt;
        this.hash = user.hash;
    } else {
        throw new Error("user can not be null");
    }
}
Authentication.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}
Authentication.prototype.validPassword = function (password) {
    return this.hash === crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}
Authentication.prototype.generateJWT = function () {
    return jwt.sign({
        key: this.key,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
    }, config.JWT_SECRET, { expiresIn: config.SECURITY_JWT_TOKEN_EXPIRES_IN });
}
module.exports = Authentication;