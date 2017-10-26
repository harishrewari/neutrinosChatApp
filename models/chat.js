var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	users: 		String,
  	message: String,
  	updated_at: { type: Date, default: Date.now },
  	sender: String
});

module.exports = mongoose.model('Chat', ChatSchema);