const { check } = require('express-validator')
module.exports = {
    user_register: [
        check('firstname', 'first name is required').trim().isLength({ min: 2 }),
        check('lastname', 'last name is required').trim().isLength({ min: 2 }),
        check('email').isEmail().withMessage('email must be an valid email address'),
        check('password', 'password must be at least 6 characters long and containing one number')
            .isLength({ min: 6 }).matches(/^(?=.*[A-Za-z\W])(?=.*\d)[A-Za-z\d\W]{6,}$/),
    ],
    user_login: [
        check('email').isEmail().withMessage('email must be an valid email address'),
        check('password', 'password is required').trim().isLength({ min: 1 })
    ],
}

