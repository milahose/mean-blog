const router = require('express').Router();
const Like = require('../../models/Like');

router.post('/', (req, res) => {
	Like.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json({ err: false, msg: 'Success', result }))
		.then(null, err => res.json({ err: true, msg: err.message }))
});

router.get('/', (req, res) => {
	Like.findOne({
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
	Like.findOneAndUpdate({
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