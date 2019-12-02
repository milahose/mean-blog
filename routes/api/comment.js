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

router.get('/', (req, res) => {
	Comment.findOne({
		...req.body,
		user: req.decoded.userId
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

router.put('/', (req, res) => {
	Comment.findOneAndUpdate({
		blog: req.body.blog,
		user: req.decoded.userId
	}, req.body, { new: true })
		.then(result => {
			if (!result) {
				res.json({ err: true, msg: 'Unable to find user likes' })
			} else {
				res.json({ err: false, msg: 'Success', result })
			}
		})
		.then(null, err => res.json({ err: true, msg: err.message }))
});

module.exports = router;