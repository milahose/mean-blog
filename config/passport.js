const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
require('dotenv').config();

const opts = {
	jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey = process.env.SECRET
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findOne({id: jwt_payload.sub}, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
}));