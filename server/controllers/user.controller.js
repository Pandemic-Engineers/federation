const { validationResult } = require('express-validator');
const error = require('../util/applicationError');
var config = require('../../config/config');
const applicationErrors = require('../util/errors')
const userService = require('../services/user.service');
module.exports = {
    async register(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.formatWith((error) => { return { message: error.msg } })
            throw new error.RequestValidationError(errors.mapped())
        }
        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password.trim(),
        }
        try {
            const data = await userService.register(user)
            return res.json(data)
        }
        catch (err) {
            err.context = new error.ErrorContext('User', 'register', user)
            throw err
        }
    },
    async login(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.formatWith((error) => { return { message: error.msg } })
            throw new error.RequestValidationError(errors.mapped())
        }
        const email = req.body.email.trim().toLowerCase()
        const password = req.body.password
        try {
            const data = await userService.login(email.toLowerCase(), password)

            return res.json(data);
        }
        catch (err) {
            err.context = new error.ErrorContext('User', 'Login', { email })
            throw err;
        }
    },
}