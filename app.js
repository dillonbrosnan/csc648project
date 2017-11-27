
'use strict';
'use strict';

var express = require('express');
var port = 17007;
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var session = require('express-session');

//App delcaration
var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(session({
    secret: '4F33-5ZDE-ZggpE3D',
    resave: true,
    saveUninitialized: true
}));

//All routes for application
var index = require('./routes/index.js');
var sale = require('./routes/sale.js');
var portfolio = require('./routes/portfolio.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var team = require('./routes/team.js');
var post = require('./routes/post.js');

app.use(express.static(__dirname + "/public"));


<!-- Routes -->
app.use('', index);
app.use('/sale', sale);
app.use('', portfolio);
app.use('/login', login);
app.use('/register', register);
app.use('/team', team);
app.use('/agent/post', post);

<!-- Listening port -->
app.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})

