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
var saleListing = require('./routes/saleListing.js');
var viewListings = require('./routes/viewListings.js');
var viewMessages = require('./routes/viewMessages.js');
var deleteListing = require('./routes/deleteListing.js');
var logout = require('./routes/logout.js');
var messageAgent = require('./routes/messageAgent.js');
var editProfile = require('./routes/editProfile.js');
var errorPage = require('./routes/error')

app.use(express.static(__dirname + '/public'));


<!-- Routes -->
app.use('', index);
app.use('/forSale', sale);
app.use('', portfolio);
app.use('/login', login);
app.use('/register', register);
app.use('/team', team);
app.use('/agent/post', post);
app.use('/forSale', saleListing);
app.use('/agent/viewListings', viewListings);
app.use('/agent/viewMessages', viewMessages);
app.use('/agent/deleteListing', deleteListing);
app.use('/forSale', messageAgent);
app.use('/editProfile', editProfile);
app.use('/logout', logout);
app.use('/error', errorPage);



app.get('*', function(req, res){
  res.redirect('/fa17g07/');
});


<!-- Listening port -->
server.listen(port, function () {
  console.log('App listening on port ' + port + '!');
})





