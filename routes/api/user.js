const router = require('express').Router();
const User = require('../../models/User');
const Blog = require('../../models/Blog');

router.get('/@:username/posts', (req, res) => {
	let result = {};

	User.findOne({ username: req.params.username })
		.then(user => {
			result.user = user;
			return Blog.find({ username: req.params.username }).sort({ date: -1 });
		})
		.then(blogs => {
			result.blogs = blogs;
			res.json({ err: false, msg: 'success', result })
		})
		.then(null, err => res.json({err: true, msg: err.message}))
});

module.exports = router;