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
<<<<<<< HEAD
  res.render('index');
=======

  var sql = 'SELECT Sale.saleId, Sale.price, Sale.streetNumber, Sale.streetName, Sale.city, '
    + 'Sale.state, Sale.postalCode, Sale.lat, Sale.lon, SaleImages.imageId FROM Sale, SaleImages'
    + ' WHERE Sale.saleId = SaleImages.saleId';
  var data;
  var images;
  db.query(sql, function (err, rows) {
      if (err) throw err;
      if(rows.length != 0){
          data = rows;
          res.render('index', { data : data });
        }else{
          data = rows;
          res.render('index', { data : data });
      }
  })
>>>>>>> dev
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

