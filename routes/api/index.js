const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = require('./auth');
const user = require('./user');
const blog = require('./blog');
const like = require('./like');
const comment = require('./comment');

router.use('/auth', auth);

// Middleware to check for JWT token
router.use((req, res, next) => {
	const token = (
		req.headers.authorization && req.headers.authorization.split(' ')[1]
	); 

	if (!token) {
		res.json({ err: true, msg: 'No token provided.' });
	} else {
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				res.json({ err: true, msg: `Invalid token: ${err.toString()}` });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
});

router.use('/user', user);
router.use('/blog', blog);
router.use('/like', like);
router.use('/comment', comment);

module.exports = router;