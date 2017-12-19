var pool = require('../db');
var Promise = require('promise');

var getMessages = function (agentId)	{

	return new Promise(function(resolve, reject)	{


		var array = [agentId];
		var sql = ['SELECT messageContent, messageId, date, saleId, phoneNo FROM SaleMessages WHERE',
					'agentId = ? ORDER BY date DESC'].join(" ");

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

module.exports.getMessages = getMessages;