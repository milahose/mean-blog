const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = require('./auth');
const user = require('./user');
const blog = require('./blog');

router.use('/auth', auth);

router.use((req, res, next) => {
	const token = req.headers.authorization.split(' ')[2]; 

	if (!token) {
		res.json({ err: true, msg: 'No token provided.' });
	} else {
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				res.json({ err: true, msg: `Invalid token: ${err}` });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
});

router.use('/user', user);
router.use('/blog', blog);

module.exports = router;