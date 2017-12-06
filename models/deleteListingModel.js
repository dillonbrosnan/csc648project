var pool = require('../db');
var Promise = require('promise');

var getPermission = function (agentId, saleId)	{

	return new Promise(function(resolve, reject)	{


		var array = [agentId, saleId];
		var sql = ['SELECT saleId FROM Sale WHERE',
					'agentId = ? AND saleId = ?'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var deleteListing = function(agentId, saleId)	{

	return new Promise(function(resolve, reject)	{


		var array = [saleId, agentId];
		var sql = ["DELETE FROM Sale WHERE",
		"saleId = ?",
		"and agentId = ?;"].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

module.exports.getPermission = getPermission;
module.exports.deleteListing = deleteListing;