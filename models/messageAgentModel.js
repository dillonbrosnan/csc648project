var pool = require('../db');
var Promise = require('promise');

var getAgentId = function (saleId)	{

	return new Promise(function(resolve, reject)	{

		var array = [saleId];
		
		var sql = "SELECT agentId FROM Sale WHERE saleId = ?";

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
			if(err) return reject(err);

			connection.query(sql, array, function (err, agentId) {
	          
			if(err)	{
				return reject(err);
			}

			return resolve(agentId);

	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var sendMessage = function (messageId, agentId, saleId, date, messageContent, phoneNo)	{

	return new Promise(function(resolve, reject)	{

		var array = [messageId, agentId, saleId, date, messageContent, phoneNo];
		
		var sql = ['INSERT INTO SaleMessages (messageId, agentId, saleId, date, messageContent, phoneNo)',
			'VALUES(?, ?, ?, ?, ?, ?)'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
			if(err) return reject(err);

			connection.query(sql, array, function (err, messages) {
	          
			if(err)	{
				return reject(err);
			}

			return resolve(messages);

	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

module.exports.getAgentId = getAgentId;
module.exports.sendMessage = sendMessage;