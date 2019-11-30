const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();

router.post('/register', (req, res, next) => {
	const { email, username } = req.body;

	if (!req.body.firstname) {
		return res.json({ err: true, msg: 'First name is required.' });
	}
	
	if (!req.body.lastname) {
		return res.json({ err: true, msg: 'Last name is required.' });
	}

	if (!req.body.username) {
		return res.json({ err: true, msg: 'Username is required.' });
	}

	if (!req.body.email) {
		return res.json({ err: true, msg: 'Email is required.' });
	}

	if (!req.body.password) {
		return res.json({ err: true, msg: 'Password is required.' });
	}

	User.find({ $or: [{ email }, { username }] })
		.then(user => {
			if (user.length) {
				return res.json({ err: true, msg: 'Username or email already exists.'});
			} else {
				return User.create(req.body);
			}
		})
		.then(() => res.json({ err: false, msg: 'Account registered.' }))
		.then(null, err => res.json({ err: true, msg: err.toString() }));
});

router.post('/login', (req, res) => {
	const value = req.body.usernameOrEmail;
	let dbUser;

	if (!req.body.usernameOrEmail) {
		return res.json({ err: true, msg: 'Username or email is required.' });
	}

	if (!req.body.password) {
		return res.json({ err: true, msg: 'Password is required.'} );
	}

	User.findOne({ $or: [{ email: value }, { username: value }] })
		.then(user => {
			if (!user) {
				return res.json({ err: true, msg: 'Incorrect username, password or email.' });
			} 

			dbUser = Object.assign({}, user._doc);
			return user.comparePassword(req.body.password, user.password);
		})
		.then(result => {
			if (!result) throw new Error('Incorrect username, password or email.');
			const token = `JWT ${jwt.sign({ userId: dbUser._id }, process.env.SECRET, { expiresIn: '8h' })}`;
			delete dbUser.password;
			delete dbUser.__v;
			return res.json({ err: false, msg: 'Log in successful', user: dbUser, token });
		})
		.then(null, err => res.json({ err: true, msg: err.toString() }));
});

router.post('/logout', (req, res) => {
	res.send('you hit logout')
});

module.exports = router;