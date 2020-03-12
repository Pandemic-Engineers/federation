// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JwtStrategy = passportJWT.Strategy,
//     ExtractJwt = passportJWT.ExtractJwt;
// const UserModel = require('../server/models/user.mongo');
// const config = require('./config');

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.JWT_SECRET
// }

// module.exports = function (app) {
//     passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//         UserModel.getByKey(jwt_payload.key, app.locals.mongodb)
//             .then(user => {
//                 if (!user) {
//                     return done(null, false);
//                 } else {
//                     if (user.locked === true) {
//                         return done(null, false);
//                     }
//                     if (user.token_version > jwt_payload.token_version) {
//                         return done(null, false);
//                     }
//                     return done(null, user);
//                 }
//             }).catch(error => {
//                 return done(error);
//             });
//     }));
// }