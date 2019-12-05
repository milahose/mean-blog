const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date, 
		default: Date.now
	},
	img: {
		type: String,
		required: true,
	},
	imgAlt: {
		type: String,
		required: true,
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', blogSchema);