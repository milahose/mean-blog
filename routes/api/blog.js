const router = require('express').Router();
const Blog = require('../../models/Blog');
const Like = require('../../models/Like');
const Comment = require('../../models/Comment');

router.post('/', (req, res) => {
	Blog.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/', (req, res) => {
	Blog.find({})
		.sort({ date: -1 })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

router.get('/:title', (req, res) => {
	const title = req.params.title.trim().split('-').join(' ');
	Blog.findOne({ title: new RegExp(`^${title}$`, 'i') })
		.sort({ date: -1 })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/id/:id', (req, res) => {
	Blog.findOne({ _id: req.params.id })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/@username/posts', (req, res) => {
	Blog.find({ username: req.params.username })
		.sort({ date: -1 })
		.then(result => res.json(result))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.post('/edit', (req, res) => {
	Blog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
		.then(blog => res.json({ err: false, blog }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

router.delete('/delete/:id', (req, res) => {
	Blog.deleteOne({ _id: req.params.id }) 
		.then(() => Comment.deleteOne({ blog: req.params.id}))
		.then(() => Like.deleteOne({ blog: req.params.id})) // delete likes and comments associate with blog
		.then(() => res.json({ err: false, msg: 'Post deleted successfully.' }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

module.exports = router;