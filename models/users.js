var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nickname: String,
  name: String,
});

module.exports = mongoose.model('User', UserSchema);