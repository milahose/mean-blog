const router = require('express').Router();
const Like = require('../../models/Like');

router.post('/', (req, res) => {
	Like.find({ blog: req.body.blog, user: req.decoded.userId })
		.then(blog => {
			if (blog.length) {
				return res.json({ err: true, msg: 'User has already liked this post' });
			} else {
				return Like.create({
					...req.body,
					user: req.decoded.userId
				});
			}
		})
		.then(result => res.json({ err: false, msg: 'Success', result }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/username/:user', (req, res) => {
	Like.find({ user: req.params.user })
		.populate('user')
		.populate('blog')
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