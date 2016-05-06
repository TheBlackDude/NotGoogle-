var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

var User = require('../models/users');


/* Build an authentication middleware */
auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* POST Signup data */
router.post('/register', function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({'message': 'PLease fill out all the fields'});
	}

	passport.authenticate('local-signup', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (user) {
			return res.json({'token': user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

/* POST login data */
router.post('/login', function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({'message': 'PLease fill out all fields'});
	}

	passport.authenticate('local-login', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (user) {
			return res.json({'token': user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

/* GET logout route */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/* GET Specific user by id */
router.get('/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}
		// Send json data
		res.json(user);
	});
});

/* UPDATE user route */
router.put('/:user_id', auth, function(req, res, next) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}

		// Set user attributes (comes from the req body)
		user.username = req.body.username;
		user.password = req.body.password;
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.tagline = req.body.tagline;

		// save the user
		user.save(function(err) {
			if (err) {
				res.send(err);
			}
			// give some success message
			res.json({message: 'User successfully Updated!'});
		});
	});
});

module.exports = router;
