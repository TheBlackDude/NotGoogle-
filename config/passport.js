var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function(passport) {
	// Serialize User
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// Deserialize User
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// Setup local login
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		// asynchronous
		process.nextTick(function() {
			User.findOne({ 'username': username}, function(err, user) {
				// check errors
				if (err) {
					return done(err);
				}
				// check errors and bring the messages
				if (!user) {
					// third parameter is a flash message
					return done(null, false, req.flash('LoginMessage', 'No User Found'));
				}
				// check the password
				if (!user.checkPassword(password)) {
					return done(null, false, req.flash('LoginMessage', '!Warning password incorrect'));
				}
				else {
					// everything ok get user
					return done(null, user);
				}
			});
		});
	}));

	// Setup local Signup
	passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, email, username, password, done) {
		// asynchronous
		process.nextTick(function() {
			// if the user is not already logged in
			if (!req.user) {
				User.findOne({ 'username': username}, function(err, user) {
					// check errors
					if (err) {
						return done(err);
					}
					// check email and username
					if (user) {
						return done(null, false, req.flash('SignupMessage', '!Warning user already exist.'));
					}
					else {
						// create the user
						var newUser = new User();
						newUser.email = email;
						newUser.username = username;
						newUser.password = newUser.setPassword(password);

						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			}
			else {
				// everything ok, register user
				return done(null, req.user);
			}
		});
	}));
};