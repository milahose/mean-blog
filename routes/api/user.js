const router = require('express').Router();
const User = require('../../models/User');
const Blog = require('../../models/Blog');

router.get('/@:username/posts', (req, res) => {
	let result = {};

	User.findOne({ username: req.params.username })
		.then(user => {
			result.user = user;
			return Blog.find({ username: req.params.username });
		})
		.then(blogs => {
			result.blogs = blogs;
			res.json({ err: false, msg: 'success', result })
		})
		.then(null, err => res.json({err: true, msg: err.message}))
});

router.post('/', (req, res) => {
	User.create(req.body)
		.then(result => res.json(result))
		.then(null, err => console.log(`Error! ${err}`))
});

module.exports = router;