
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

