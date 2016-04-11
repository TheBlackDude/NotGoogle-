var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
