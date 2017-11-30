
'use strict';
'use strict';

var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var session = require('express-session');
var busboyBodyParser = require('busboy-body-parser');
var fileUpload = require('express-fileupload');
var port = process.env.PORT || 17007;


//App delcaration
var app = express();

app.set('view engine', 'ejs');
app.set('port', port);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboyBodyParser());
app.use(validator());
app.use(session({
	cookie: { maxAge: 60*10000 },
    secret: '4F33-5ZDE-ZggpE3D',
    resave: true,
    saveUninitialized: true
}));
var server = require('http').createServer(app);  

//All routes for application
var index = require('./routes/index.js');
var sale = require('./routes/sale.js');
var portfolio = require('./routes/portfolio.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var team = require('./routes/team.js');
var post = require('./routes/post.js');
var userChat = require('./routes/userChat.js');
var saleListing = require('./routes/saleListing.js');

app.use('/public',express.static(path.join(__dirname, '/public')));

<!-- Routes -->
app.use('', index);
app.use('forSale', sale);
app.use('', portfolio);
app.use('login', login);
app.use('register', register);
app.use('team', team);
app.use('agent/post', post);
app.use('user/message', userChat);
app.use('forSale', saleListing);

<!-- Listening port -->
server.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})





