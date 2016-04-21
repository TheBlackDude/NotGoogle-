var express = require('express');
var Post = require('../models/posts');

router = express.Router();

/* GET all posts */
router.get('/', function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			res.send(err);
		}
		res.json(posts);
	});
});