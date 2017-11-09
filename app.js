
'use strict';
'use strict';

var express = require('express');
//var port = process.env.PORT || 17007;
var port = 17007;
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//All routes for application
var sale = require('./routes/sale.js');
var index = require('./routes/index.js');

//App delcaration
var app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


<!-- Routes -->
app.use('/sale', sale);
app.use('', index);

app.get('/portfolio', function(req, res) {  
  res.render('portfolio');
});

app.get('/vikram', function(req, res) {  
  res.render('team/vikram');
})
app.get('/animohan', function(req, res) {  
  res.render('team/animohan');
});

app.get('/dillonb', function(req, res) {  
  res.render('team/dillonb');
});

app.get('/indra', function(req, res) {  
  res.render('team/indra');
});

app.get('/darrylr', function(req, res) {  
  res.render('team/darrylr');
});

app.get('/royanguiano', function(req, res) {  
  res.render('team/royanguiano');
});

// Route
app.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT userId FROM User WHERE username = ? and password = ?';
  db.query(sql, [username, password], function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
        var userId = rows[0].userId.toString();
        res.cookie('priviledge', 'user');
        res.send(userId);
        }else{
            res.json(rows);
      }
  })
});

// Route
app.post('/login/admin',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT adminId FROM Admin WHERE username = ? and password = ?';
  db.query(sql, [username, password], function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
        var adminId = rows[0].adminId.toString();
        res.cookie('priviledge', 'admin');
        res.send(adminId);
        }else{
            res.json(rows);
      }
  })
});

// Route
app.post('/login/agent',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT agentId FROM Agent WHERE username = ? and password = ?';
  db.query(sql, [username, password], function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
        var agentId = rows[0].agentId.toString();
        res.cookie('priviledge', 'admin');
        res.send(agentId);
        }else{
            res.json(rows);
      }
  })
});

// Search route

/* 
  Commenting source for formula
  https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943  
*/



app.get('/rent?:lan?:lon', function(req, res) {
    

    var lat = req.query.lat;
    var lon = req.query.lon;
    lat = Number(lat);
    lon = Number(lon);
    
    //var lat = 121.01323;
    //var lon = -2323.23232;


    // Fake lat lon for test purposes this would be from a database
    var lat1 = 37.302458;
    var lon1 = -121.810315;
    
    var distance = getDistance(lat, lon, lat1, lon1);
    distance = 0.621371 * distance;
    console.log(distance, "miles apart");
    res.end();
});

app.get('/image/:id', function(req, res) {  

  var imageNumber = req.params.id;
  console.log(imageNumber);
  var sql = 'SELECT imageId FROM SaleImages WHERE saleId = ?';
  var imageId;
  db.query(sql, [imageNumber], function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
          imageId = rows;
          res.render('image', {imageId:imageId});
        }else{
          imageId = rows;
          res.render('image', {imageId:imageId});
      }
  })
});


<!-- Listening port -->
app.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})

