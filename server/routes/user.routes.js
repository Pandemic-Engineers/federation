const userSchema = require('../schemas/user');
const asyncHandler = require('express-async-handler')
const UserController = require('./../controllers/user.controller')

module.exports = function (app) {
    app.post('/users', userSchema.user_register, UserController.register)
    app.post('/users/login', userSchema.user_login, asyncHandler(UserController.login))
}
