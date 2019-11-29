const router = require('express').Router();
const User = require('../../models/User');

router.post('/register', (req, res, next) => {
	const { email, username } = req.body;

	if (!req.body.firstname) {
		res.status(500).json({ msg: 'First name is required.' });
	}
	
	if (!req.body.lastname) {
		res.status(500).json({ msg: 'Last name is required.' });
	}

	if (!req.body.username) {
		res.status(500).json({ msg: 'Username is required.' });
	}

	if (!req.body.email) {
		res.status(500).json({ msg: 'Email is required.' });
	}

	if (!req.body.password) {
		res.status(500).json({ msg: 'Password is required.' });
	}

	User.find({ email, username })
		.then(user => {
			if (user.length) {
				if (user[0].email === email) {
					res.status(409).json({ msg: 'Email already exists'});
				} else if (user[0].username === username) {
					res.status(409).json({ msg: 'Username already exists'});
				}
			} else {
				return User.create(req.body);
			}
		})
		.then(result => res.json(result))
		.then(null, err => res.status(500).json({ msg: err }));
});

router.post('/login', (req, res) => {
	res.send('you hit login')
});

router.post('/logout', (req, res) => {
	res.send('you hit logout')
});

module.exports = router;