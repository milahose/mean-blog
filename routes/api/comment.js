const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/', (req, res) => {
	Comment.create({
		...req.body,
		user: req.decoded.userId
	})
		.then(result => res.json(result))
		.then(null, err => res.json({err: true, msg: err.message}))
});

module.exports = router;