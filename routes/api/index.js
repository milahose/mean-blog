const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const blog = require('./blog');

router.use('/auth', auth);
router.use('/user', user);
router.use('/blog', blog);

module.exports = router;