const router = require('express').Router();
const User = require('../../models/User');

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
		.then(null, err => res.json({ err: true, msg: err }));
});

router.post('/login', (req, res) => {
	const value = req.body.usernameOrEmail;

	if (!req.body.usernameOrEmail) {
		return res.json({ err: true, msg: 'Username or email is required.' });
	}

	if (!req.body.password) {
		return res.json({ err: true, msg: 'Password is required.'} );
	}

	User.find({ $or: [{ email: value }, { username: value }] })
		.then(user => {
			if (!user.length) {
				res.json({ err: true, msg: 'Incorrect username, password or email.' });
			} else {
				res.json({ err: false, msg: 'Log in successful', user })
			}
		})
		.then(null, err => res.json({ err: true, msg: err }));
});

router.post('/logout', (req, res) => {
	res.send('you hit logout')
});

module.exports = router;