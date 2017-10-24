'use strict';
'use strict';

var express = require('express');
//var port = process.env.PORT || 17007;
var port = 17007;
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

<!-- Routes -->

app.get('/', function(req, res) {  
  var sql = 'SELECT * FROM Sale';
  db.query(sql, function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
          res.json(rows);
        }else{
          res.json(rows);
      }
  })
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
function getRadianDeg(deg) {
  return deg * (Math.PI/180)
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = getRadianDeg(lat2-lat1);  // getRadianDeg below
  var dLon = getRadianDeg(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(getRadianDeg(lat1)) * Math.cos(getRadianDeg(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

app.get('/sell?:lan?:lon', function(req, res) {
    
    var lat = req.query.lat;
    var lon = req.query.lon;
    lat = Number(lat);
    lon = Number(lon);
    
    //var lat = 121.01323;
    //var lon = -2323.23232;


    // Fake lat lon for test purposes this would be from a database
    var lat1 = 37.721897;
    var lon1 = -122.478209;
    
    var distance = getDistance(lat, lon, lat1, lon1);
    distance = 0.621371 * distance;
    console.log(distance, "miles apart");
    res.end();
});

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

<!-- Listening port -->
app.listen(port, function () {
  console.log('Real estate app listening on port 17007!');
})

