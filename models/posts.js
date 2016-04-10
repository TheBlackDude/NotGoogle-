var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	content: { type: String, default: '' },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);