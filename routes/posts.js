var express = require('express');
var Post = require('../models/posts');
var jwt = require('express-jwt');

router = express.Router();

// Implement an authentication middleware
auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET all posts */
router.get('/', function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			res.send(err);
		}
		res.json(posts);
	});
});

/* GET Specific post by id */
router.get('/:post_id', auth, function(req, res) {
	Post.findById(req.params.post_id, function(err, post) {
		if (err) {
			res.send(err);
		}
		// send json data
		res.json(post);
	});
});

/* SEND Posts */
router.post('/', auth, function(req, res) {
	// Create a Post instance
	var post = new Post();

	// Set the author
	post.author = req.payload.username;

	// Set the post attributes (come from the req.body)
	post.content = req.body.content;

	// save the post
	post.save(function(err) {
		if (err) {
			res.send(err);
		}
		// give some success message
		res.json({message: 'Post successfully Created!'});
	});

});

/* UPDATE Posts */
router.put('/:post_id', auth, function(req, res) {
	Post.findById(req.params.post_id, function(err, posts) {
		if (err) {
			res.send(err);
		}

		// update the post 
		posts.content = req.body.content;

		// save the post
		posts.save(function(err) {
			if (err) {
				res.send(err);
			}
			// give some success message
			res.json({message: 'Post Updated successfully!'});
		});
	});
});

/* DELETE Post by id */
router.delete('/:post_id', auth, function(req, res) {
	Post.remove({_id: req.params.post_id}, function(err, post) {
		if (err) {
			res.send(err);
		}
		// give some success message
		res.json({message: 'Post Deleted successfully!'});
	});
});


/* Exports all routes to router */
module.exports = router;