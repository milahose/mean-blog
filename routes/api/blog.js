const router = require('express').Router();
const Blog = require('../../models/Blog');

router.get('/:title', (req, res) => {
	Blog.findOne({ 
		title: 'Learning JavaScript', 
		user: req.decoded.userId 
	})
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/@username/posts', (req, res) => {
	Blog.find({ username: req.params.username })
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.post('/edit', (req, res) => {
	Blog.findOneAndUpdate({
		title: 'Learning JavaScript',
		user: req.decoded.userId 
	}, req.body, { new: true })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

router.post('/', (req, res) => {
	Blog.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

module.exports = router;