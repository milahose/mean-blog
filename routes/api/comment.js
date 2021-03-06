const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/', (req, res) => {
	Comment.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json({ err: false, msg: 'Success', result }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/username/:username', (req, res) => {
	Comment.find({ username: req.params.username })
		.sort({ date: -1 })
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user comments.' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/blog/:blogId', (req, res) => {
	Comment.find({ blog: req.params.blogId })
		.sort({ date: -1 })
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user comments.' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.put('/', (req, res) => {
	Comment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user comments.' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.delete('/:id', (req, res) => {
	Comment.findOneAndDelete({
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