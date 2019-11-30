const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const blog = require('./blog');

router.use('/auth', auth);

router.use((req, res, next) => {
	const { token } = req.headers;
	return next(token && token.split(' ')[2])
})

router.use('/user', user);
router.use('/blog', blog);

module.exports = router;