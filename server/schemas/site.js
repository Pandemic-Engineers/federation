const { check } = require('express-validator')
module.exports = {
    create_asset: [
        check('name', 'name is required').trim().isLength({ min: 2 }),
    ],
    create_site: [
        check('name', 'name is required').trim().isLength({ min: 2 }),
    ],
    log_visit: [
        check('name', 'name is required').trim().isLength({ min: 1 }),
        check('site_key', 'site key is required').trim().isLength({ min: 1 }),
    ],
}
