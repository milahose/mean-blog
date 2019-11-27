const router = require('express').Router();
const User = require('../../models/User');

router.get('/@:username/posts', (req, res) => {
	res.send(req.params.username)
	// Blog.find({ title: 'Some Cool JavaScript Topic' })
	// 	.populate('author')
	// 	.then(result => res.json(result))
	// 	.then(null, err => console.log(`Error! ${err}`))
})

router.post('/', (req, res) => {
	User.create(req.body)
		.then(result => res.json(result))
		.then(null, err => console.log(`Error! ${err}`))
});

module.exports = router;