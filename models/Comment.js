const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	user: { 
		type: Schema.Types.ObjectId,
		ref: 'User' 
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	blog: {
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Comment', commentSchema);