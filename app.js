var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var chat = require('./routes/chat');
var users = require('./routes/users');
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/neutrinoschat')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

  

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(path.join(__dirname, 'chatApp'),'dist') ));

app.use('/chat', chat);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port') ,function(){
	console.log('Server started on port '+app.get('port'));
});
