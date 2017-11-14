
'use strict';
'use strict';

var express = require('express');
var port = 17007;
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//All routes for application
var index = require('./routes/index.js');
var sale = require('./routes/sale.js');
var portfolio = require('./routes/portfolio.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var team = require('./routes/team.js');
var post = require('./routes/post.js');

//App delcaration
var app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

