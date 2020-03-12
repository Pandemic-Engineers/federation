const userModel = require('../models/user.mongo')
const error = require('../util/applicationError')
const applicationErrors = require('../util/errors')
const Authentication = require('../../config/authentication')

module.exports = {
    async verifyUserInfo(user) {
        let verified = true
        if (!user.firstname || !user.lastname) {
            throw new error.ApplicationError(applicationErrors.user_register_username_required, new error.ErrorContext('user.service', 'register', { user }));
        }
        if (!user.email || !user.password) {
            throw new error.ApplicationError(applicationErrors.user_register_email_password_required, new error.ErrorContext('user.service', 'register', { user }));
        }
        const email_exists = await this.checkEmailExist(user.email.toLowerCase());
        if (email_exists) {
            throw new error.EmailAlreadyExistsError()
        }
        return verified
    },
    async checkEmailExist(email) {
        const existing = await userModel.checkEmailExist(email)
        return existing
    },
    async register(user) {
        await this.verifyUserInfo(user)
        let userAuth = new Authentication(user)
        userAuth.setPassword(user.password)
        user.key = await userModel.create(userAuth)
        user.token = userAuth.generateJWT()
        delete user.password

        return user
    },
    async login(email, password) {
        if (!email || !password) {
            throw new error.ApplicationError(applicationErrors.user_login_email_password_required, new error.ErrorContext('user.service', 'login', { email }));
        }
        const user = await userModel.getByEmail(email)
        if (!user) {
            throw new error.ApplicationError(applicationErrors.user_login_email_password_incorrect, new error.ErrorContext('user.service', 'login', { email }));
        }
        const auth = new Authentication(user);
        if (!auth.validPassword(password)) {
            throw new error.ApplicationError(applicationErrors.user_login_email_password_incorrect, new error.ErrorContext('user.service', 'login', { email }));
        }
        const jwtToken = auth.generateJWT();
        delete user.salt
        delete user.hash
        user.token = jwtToken;
        return user
    },
}