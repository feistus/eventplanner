var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var subscribers = require('./routes/subscribers');
var happenings = require('./routes/happenings');
// var mailer = require('./routes/mailer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
var corseOptions = {
	origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
} 
app.use(cors(corseOptions));

// Enable CORS Pre-Flight
app.options('*', cors());

app.use('/', index);
app.use('/eventplanner-api/subscribers/', subscribers);
app.use('/eventplanner-api/happenings/', happenings);
// app.use('/eventplanner-api/mailer/', mailer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
