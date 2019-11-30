const router = require('express').Router();
const Blog = require('../../models/Blog');

// router.get('/', (req, res) => {
// 	const { username, title } = req.body;
// 	console.log(req)
// 	// get a single post by username (unique) & title?

// 	// Blog.findOne({ username, title })
// 	// 	.then(result => res.json(result))
// 	// 	.then(null, err => console.log(`Error! ${err}`))
// });

router.get('/', (req, res) => {
	return res.json(req.headers.authorization)
});

router.post('/', (req, res) => {
	Blog.create(req.body)
		.then(result => res.json(result))
		.then(null, err => console.log(`Error! ${err}`))
});

module.exports = router;