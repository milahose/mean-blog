const router = require('express').Router();
const Blog = require('../../models/Blog');

router.get('/', (req, res) => {
	return res.json(req.decoded)
});

router.get('/@username/posts', (req, res) => {
	Blog.find({ username: req.params.username })
		.then(result => res.json(result))
		.then(null, err => res.json({err: true, msg: err.message}))
});

router.post('/', (req, res) => {
	Blog.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

module.exports = router;