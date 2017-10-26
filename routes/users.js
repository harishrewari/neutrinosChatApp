var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');

/* GET ALL users */
router.get('/', function(req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* SAVE CHAT */
router.post('/add', function(req, res, next) {
	console.log('recieved request to add users')
	User.find({nickname:req.body.nickname},function(err,users){
		if (err) return next(err);
		console.log("found users",users)
		console.log(users.length)
		if(users.length==0){
			console.log('adding new user')
		  User.create(req.body, function (err, post) {
		    if (err) return next(err);
		    res.json(post);
		  });
		}
		else res.json({})
	})
});


module.exports = router;