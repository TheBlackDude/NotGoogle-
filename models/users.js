var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: String,
	firstname: String,
	lastname: String,
	tagline: String
});

// Set the password hash
UserSchema.methods.setPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate the password
UserSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
