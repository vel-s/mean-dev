const config = require('./db');
const User = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) return done(err, false);
            return  user ? done(null, user) : done(null, false);
        });
    }));
};


