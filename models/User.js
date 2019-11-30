const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

userSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}

	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);