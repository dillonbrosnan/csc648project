var express = require('express');
var router = express.Router();
var SaleModel = require('../models/saleModel.js');

// Search route

router.post('/', function(req, res) {
    
    var milesRadius = req.body.milesRadius;
    var lat = req.body.lat;
    var lon = req.body.lng;

    lat = Number(lat);
    lon = Number(lon);
    milesRadius = Number(milesRadius);

    // All form validation is include below using express-validator
    req.checkBody('milesRadius', 'Miles must be between 0 and 3400').notEmpty().isInt({ min: 0, max: 3400 });
    req.checkBody('lat', 'Latitude must be between -90 and 90').notEmpty().isFloat({ min: -90, max: 90 });
    req.checkBody('lng', 'Longitude must be between -180 and 180').notEmpty().isFloat({ min: -180, max: 180 });
    var errors = req.validationErrors();

    // Checks to see if there is any errors with form types
    if (errors) {
      
      var response = { errors: [] };
      errors.forEach(function(err) {
        response.errors.push(err.msg);
      });
      res.statusCode = 400;
      return res.json(response);

    } else  {

        var saleListings;
        SaleModel.getSaleListings(lat, lon, milesRadius)
        .then(function(saleListingResults)  {
            saleListings = saleListingResults;
            if(saleListings.length > 0) {
                return Promise.all(saleListings.map(function(saleListing)  {
                    var saleId = saleListing.saleId;
                    return SaleModel.getSaleImages(saleId).then(function(result)  {
                        console.log(result);
                        return result;
                    })
                }))
            }
        })
        .then(function(saleImages)    {
            if(saleListings.length >= 0 && req.session.isLoggedIn) {
                console.log(saleListings);
                console.log(saleImages);
                res.render('sale', {
                    lat: lat, 
                    lon: lon, 
                    saleListings: saleListings,
                    saleImages: saleImages,
                    milesRadius: milesRadius,
                    role: req.session.role,
                    id: req.session.sessionId
                })
            } else if(saleListings.length >= 0 && !req.session.isLoggedIn) {
                res.render('sale', {
                    lat: lat, 
                    lon: lon, 
                    saleListings: saleListings,
                    saleImages: saleImages,
                    milesRadius: milesRadius
                })
            }
        })
        .catch(function(err) {
            return res.redirect('/fa17g07/error');
        });
    }


});

router.post('/advancedSearch/', function(req, res) {
    
    var milesRadius = req.body.milesRadius;
    var lat = req.body.lat;
    var lon = req.body.lng;
    var bedsMin = req.body.bedsMin;
    var bedsMax = req.body.bedsMax;
    var bathsMin = req.body.bathsMin;
    var bathsMax = req.body.bathsMax;
    var sqFtMin = req.body.sqFtMin;
    var sqFtMax = req.body.sqFtMax;
    var lotSqFtMin = req.body.lotSqFtMin;
    var lotSqFtMax = req.body.lotSqFtMax;
    var yearBuiltMin = req.body.yearBuiltMin;
    var yearBuiltMax = req.body.yearBuiltMax;
    var hoaMin = req.body.hoaMin;
    var hoaMax = req.body.hoaMax;
    var lotType = req.body.lotType;
    var priceMin = req.body.priceMin;
    var priceMax = req.body.priceMax;

    lat = Number(lat);
    lon = Number(lon);
    milesRadius = Number(milesRadius);
    bedsMin = Number(bedsMin);
    bedsMax = Number(bedsMax);
    bathsMin = Number(bathsMin);
    bathsMax = Number(bathsMax);
    sqFtMin = Number(sqFtMin);
    sqFtMax = Number(sqFtMax);
    lotSqFtMin = Number(lotSqFtMin);
    lotSqFtMax = Number(lotSqFtMax);
    yearBuiltMin = Number(yearBuiltMin);
    yearBuiltMax = Number(yearBuiltMax);
    hoaMin = Number(hoaMin);
    hoaMax = Number(hoaMax);
    priceMin = Number(priceMin);
    priceMax = Number(priceMax);

    // All form validation is include below using express-validator
    req.checkBody('milesRadius', 'Miles must be between 0 and 3400').notEmpty().isInt({ min: 0, max: 3400 });
    req.checkBody('lat', 'Latitude must be between -90 and 90').notEmpty().isFloat({ min: -90, max: 90 });
    req.checkBody('lng', 'Longitude must be between -180 and 180').notEmpty().isFloat({ min: -180, max: 180 });
    req.checkBody('bedsMin', 'Beds must be between 0 and 20').notEmpty().isInt({ min: 0, max: 20 });
    req.checkBody('bedsMax', 'Beds must be between 0 and 20').notEmpty().isInt({ min: 0, max: 20 });
    req.checkBody('bathsMin', 'Baths must be between 0 and 20').notEmpty().isFloat({ min: 0, max: 20 });
    req.checkBody('bathsMax', 'Baths must be between 0 and 20').notEmpty().isFloat({ min: 0, max: 20 });
    req.checkBody('sqFtMin', 'Square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
    req.checkBody('sqFtMax', 'Square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
    req.checkBody('lotSqFtMin', 'Lot square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
    req.checkBody('lotSqFtMax', 'Lot square feet must be between 0 and 1000000').notEmpty().isInt({ min: 0, max: 1000000 });
    req.checkBody('yearBuiltMin', 'Year built must be between 0 and ' + new Date().getFullYear())
        .notEmpty().isInt({ min: 0, max: new Date().getFullYear() });
    req.checkBody('yearBuiltMax', 'Year built must be between 0 and ' + new Date().getFullYear())
        .notEmpty().isInt({ min: 0, max: new Date().getFullYear() });
    req.checkBody('hoaMin', 'Hoa must be between 0 and 10000').notEmpty().isInt({ min: 0, max: 10000 });
    req.checkBody('hoaMax', 'Hoa must be between 0 and 10000').notEmpty().isInt({ min: 0, max: 10000 });
    req.checkBody('priceMin', 'Price must between 0 and 1000000000').notEmpty().isInt({ min: 0, max: 1000000000 });
    req.checkBody('priceMax', 'Price must be between 0 and 1000000000').notEmpty().isInt({ min: 0, max: 1000000000 });
    var errors = req.validationErrors();

    // Checks to see if there is any errors with form types
    if (errors) {
      
      return res.redirect('/fa17g07/');

    } else  {

        SaleModel.getAdvancedSaleListings(lat, lon, milesRadius, bedsMin, bedsMax, bathsMin, bathsMax, sqFtMin,
        sqFtMax, lotSqFtMin, lotSqFtMax, yearBuiltMin, yearBuiltMax, hoaMin, hoaMax, lotType, priceMin, priceMax)
        .then(function(saleListingResults)  {
            saleListings = saleListingResults;
            if(saleListings.length > 0) {
                return Promise.all(saleListings.map(function(saleListing)  {
                    var saleId = saleListing.saleId;
                    return SaleModel.getSaleImages(saleId).then(function(result)  {
                        console.log(result);
                        return result;
                    })
                }))
            }
        })
        .then(function(saleImages)    {
            if(saleListings.length >= 0 && req.session.isLoggedIn) {
                res.render('sale', {
                    lat: lat, 
                    lon: lon, 
                    saleListings: saleListings,
                    saleImages: saleImages,
                    milesRadius: milesRadius,
                    role: req.session.role,
                    id: req.session.sessionId
                })
            } else if(saleListings.length >= 0 && !req.session.isLoggedIn) {
                res.render('sale', {
                    lat: lat, 
                    lon: lon, 
                    saleListings: saleListings,
                    saleImages: saleImages,
                    milesRadius: milesRadius
                })
            }
        })
        .catch(function(err) {
          res.redirect("/fa17g07/error");
        });
    }


});

module.exports = router;