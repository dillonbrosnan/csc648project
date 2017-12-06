var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var fileUpload = require('express-fileupload');
var PostModel = require('../models/postModel');

// Route
router.get('/',function(req,res){
  console.log(req.session.role);
  console.log(req.session.agentId);
  if(req.session.role != "agent") {
    res.redirect('../../login/agent');
  } else  {
  res.render('post');
  }
});

router.post('/', function(req,res){

  var beds = req.body.beds;
  var baths = req.body.baths;
  var sqFt = req.body.sqFt;
  var lotSqFt = req.body.lotSqFt;
  var yearBuilt = req.body.yearBuilt;
  var hoa = req.body.hoa;
  var lotType = req.body.lotType;
  var price = req.body.price;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var formattedAddress = req.body.formattedAddress;
  var description = req.body.description;
  var currentTimestamp = moment().unix();
  var datePosted = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
  var saleId = uuidv4({msecs: new Date().getTime()});
  var imageId = uuidv4({msecs: new Date().getTime()});
  var agentId = req.session.sessionId;

  beds = Number(beds);
  baths = Number(baths);
  sqFt = Number(sqFt);
  lotSqFt = Number(lotSqFt);
  yearBuilt = Number(yearBuilt);
  hoa = Number(hoa);
  price = Number(price);
  lat = Number(lat);
  lng = Number(lng);


  // All form validation is include below using express-validator
  req.checkBody('lat', 'Latitude must be between -90 and 90').notEmpty().isFloat({ min: -90, max: 90 });
  req.checkBody('lng', 'Longitude must be between -180 and 180').notEmpty().isFloat({ min: -180, max: 180 });
  req.checkBody('beds', 'Beds must be between 0 and 20').notEmpty().isInt({ min: 0, max: 20 });
  req.checkBody('baths', 'Baths must be between 0 and 20').notEmpty().isFloat({ min: 0, max: 20 });
  req.checkBody('sqFt', 'Square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
  req.checkBody('lotSqFt', 'Lot square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
  req.checkBody('yearBuilt', 'Year built must be between 0 and ' + new Date().getFullYear())
      .notEmpty().isInt({ min: 0, max: new Date().getFullYear() });
  req.checkBody('hoa', 'Hoa must be between 0 and 10000').notEmpty().isInt({ min: 0, max: 10000 });
  req.checkBody('description', 'Description must be between 0 and 255 characters').isLength({ min: 0, max: 255 });
  req.checkBody('price', 'Price must between 0 and 1000000000').notEmpty().isInt({ min: 0, max: 1000000000 });
  var errors = req.validationErrors();


    

  if(errors)  {
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }   
  else if(req.files.saleImage.length > 12 || !req.files) {
      res.send("File wrong");
  }
  else  {
    req.files.saleImage.mv('public/images/' + imageId + '.jpg', function(err)  {
      if(err) {
        console.log(err);
        res.send(err);
      }
    });
    PostModel.checkFormattedAddress(formattedAddress)
    .then(function() {
      return Promise.all([PostModel.insertImage(saleId, imageId)]); 
    })
    .then(function() {
      return Promise.all([PostModel.insertPosting(beds, baths, sqFt, lotSqFt, yearBuilt, 
      hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted, description, agentId)]); 
    })
    .then(function() {
      return res.redirect('../../forSale/' + saleId + '/')
    })
    .catch(function(err) {
      console.log(err);
      res.status(400);
      return res.send("Couldn't post posting");
    });    
  } 

});




module.exports = router;