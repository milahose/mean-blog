const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	like: {
		type: Number,
		default: 0
	},
	blog: {
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	}
});

module.exports = mongoose.model('Like', likeSchema);