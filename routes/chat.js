var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/chat.js');

server.listen(4000);

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log('received data',data);
    io.emit('new-message', { message: data });
  });
});

// /* GET ALL CHATS */
// router.get('/:me/:you', function(req, res, next) {
// 	console.log('request came')
// 	console.log("Me: ", req.params.me)
// 	console.log("Room:",req.params.room)
//   Chat.find({ room: req.params.room }, function (err, chats) {
//     if (err) return next(err);
//     res.json(chats);
//   });
// });

router.get('/:me/:you', function(req, res, next) {
	console.log('request came')
	console.log("Me: ", req.params.me)
	console.log("Room:",req.params.you)
		if(req.params.me>req.params.you){
		var users=req.params.me+'_'+req.params.you
	}
	else {
		var users=req.params.you+'_'+req.params.me
	}

	  Chat.find({ users:users}, function (err, chats) {
	    if (err) return next(err);
	    console.log("found something",chats)
	    res.json(chats);
	  });

});



/* SAVE CHAT */
router.post('/', function(req, res, next) {
	console.log(req.body)
	if(req.body.me>req.body.you){
		var users=req.body.me+'_'+req.body.you
	}
	else {
		var users=req.body.you+'_'+req.body.me
	}
	var message={users:users,message:req.body.message,sender:req.body.me}
  Chat.create(message, function (err, post) {
    if (err) return next(err);
    console.log(post)
    res.json(post);
  });
});

module.exports = router;