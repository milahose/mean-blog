const router = require('express').Router();
const Like = require('../../models/Like');
const User = require('../../models/User');

router.post('/', (req, res) => {
	/*
		first check if a like exists for user/blog,
		so multiple "like" documents are not inserted
		for the same person on the same blog.
	*/
	Like.find({ blog: req.body.blog, user: req.decoded.userId })
		.then(blog => {
			if (blog.length) {
				return res.json({ err: true, msg: 'User has already liked this post' });
			} else {
				return Like.create({
					...req.body,
					user: req.decoded.userId
				})
				.then(result => res.json({ err: false, msg: 'Success', result }))
				.then(null, err => res.json({ err: true, msg: err.message }))
			}
		})
});

router.get('/username/:username', (req, res) => {
	User.findOne({ username: req.params.username })
		.then(res => {
			if (!res.err) {
				return Like.find({ user: res._id })
					.populate('blog')
			}
		})
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user likes' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/blog/:blogId', (req, res) => {
	Like.find({ blog: req.params.blogId })
		.sort({ date: -1 })
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user likes' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.delete('/:id', (req, res) => {
	Like.findOneAndDelete({
		_id: req.params.id,
		user: req.decoded.userId
	})
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user likes' })
			} else {
				res.json({ err: false, msg: 'Successfully deleted like.' })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

module.exports = router;