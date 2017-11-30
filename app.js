
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
var router = express.Router();


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
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
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

app.use('/fa17g07/', express.static(__dirname + '/public'));

<!-- Routes -->
router.use('', index);
router.use('/forSale', sale);
router.use('', portfolio);
router.use('/login', login);
router.use('/register', register);
router.use('/team', team);
router.use('/agent/post', post);
router.use('/user/message', userChat);
router.use('/forSale', saleListing);

<!-- Listening port -->
server.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})





