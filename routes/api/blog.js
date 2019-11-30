const router = require('express').Router();
const Blog = require('../../models/Blog');

router.get('/', (req, res) => {
	return res.json(req.decoded)
});

router.post('/', (req, res) => {
	Blog.create(req.body)
		.then(result => res.json(result))
		.then(null, err => console.log(`Error! ${err}`))
});

module.exports = router;