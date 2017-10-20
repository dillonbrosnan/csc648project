'use strict';
'use strict';

var express = require('express');
//var port = process.env.PORT || 17007;
var port = 17007;

var app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

<!-- Routes -->
app.get('/', function(req, res) {  
  res.render('index');
});

app.get('/portfolio', function(req, res) {  
  res.render('portfolio');
});

app.get('/vikram', function(req, res) {  
  res.render('vikram');
});
app.get('/animohan', function(req, res) {  
  res.render('animohan');
});

app.get('/dillonb', function(req, res) {  
  res.render('dillonb');
});

app.get('/indra', function(req, res) {  
  res.render('indra');
});

app.get('/darrylr', function(req, res) {  
  res.render('darrylr');
});

app.get('/royanguiano', function(req, res) {  
  res.render('royanguiano');
});

app.get('/maps', function(req, res){
	res.render('maps');
});


<!-- Listening port -->
app.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})

