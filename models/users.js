var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, unique: true },
	password: String,
	firstname: String,
	lastname: String,
	tagline: String,
	posts: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

// Set the password hash
UserSchema.methods.setPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate the password
UserSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
	// set the expiration date to 30 days

	var today = new Date()
	var exp = new Date(today);
	exp.setDate(today.getDate() + 30);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, 'SECRET');
};

module.exports = mongoose.model('User', UserSchema);
