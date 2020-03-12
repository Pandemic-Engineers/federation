const express = require('express')
const router = express.Router()

/* At the top, with other redirect methods before other routes */
// router.get('*', function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
//     res.redirect('https://' + req.hostname + req.url);
//   else
//     next(); /* Continue to other routes if we're not redirecting */
// });

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hello' })
});

module.exports = router
