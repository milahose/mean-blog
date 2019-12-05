const router = require('express').Router();
const Blog = require('../../models/Blog');
const Like = require('../../models/Like');
const Comment = require('../../models/Comment');

router.post('/', (req, res) => {
	Blog.find({ title: req.body.title, user: req.decoded.userId })
		.then(result => {
			if (result.length) {
				res.json({ 
					err: true, 
					msg: `Please choose a unique blog title (you already have a blog named "${req.body.title}").` 
				})
			} else {
				return Blog.create({
					...req.body,
					user: req.decoded.userId
				})
			}
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
	if (req.body.originalTitle.toLowerCase() !== req.body.title.toLowerCase()) {
		Blog.find({ title: req.body.originalTitle, user: req.decoded.userId })
			.then(result => {
				// Make sure user is not trying to rename the blog with a
				// title that already exists on one of their other blogs.
				if (result.length && req.body.originalTitle.toLowerCase() !== result[0].title.toLowerCase()) {
					res.json({
						err: true,
						msg: `Please choose a unique blog title (you already have a blog named "${req.body.title}").`
					})
				} else {
					Blog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
						.then(blog => res.json({ err: false, blog }))
						.then(null, err => res.json({ err: true, msg: err.message }))
				}
			})
	} else {
		Blog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
			.then(blog => res.json({ err: false, blog }))
			.then(null, err => res.json({ err: true, msg: err.message }))
	}
})

router.delete('/delete/:id', (req, res) => {
	Blog.deleteOne({ _id: req.params.id }) 
		.then(() => Comment.deleteOne({ blog: req.params.id}))
		.then(() => Like.deleteOne({ blog: req.params.id})) // delete likes and comments associated with blog
		.then(() => res.json({ err: false, msg: 'Post deleted successfully.' }))
		.then(null, err => res.json({ err: true, msg: err.message }))
})

module.exports = router;