const router = require('express').Router();
const Blog = require('../../models/Blog');

router.post('/', (req, res) => {
	Blog.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/:title', (req, res) => {
	Blog.findOne({ 
		title: 'Learning Ruby', 
		user: req.decoded.userId 
	})
		.populate('user')
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
		title: req.params.title,
		user: req.decoded.userId 
	}, req.body, { new: true })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

router.delete('/delete/:id', (req, res) => {
	Blog.deleteOne({ _id: req.params.id })
		.then(() => res.json({ err: false, msg: 'Post deleted successfully.' }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

module.exports = router;