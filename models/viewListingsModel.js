var pool = require('../db');
var Promise = require('promise');

var getListings = function (agentId)	{

	return new Promise(function(resolve, reject)	{


		var array = [agentId];
		var sql = ['SELECT saleId, formattedAddress, datePosted FROM Sale WHERE',
					'agentId = ? ORDER BY datePosted DESC'].join(" ");

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

module.exports.getListings = getListings;