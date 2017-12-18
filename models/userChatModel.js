var pool = require('../db');
var Promise = require('promise');
var moment = require('moment');
var uuidv4 = require('uuid/v4');

var getSaleMessages = function (saleId, userId)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = ['SELECT messageContent, date, role, saleId from SaleMessages WHERE', 
					'userId = ?',
					'AND saleId = ? ORDER by date DESC'].join(" ");


		var array = [userId, saleId];

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
		if(err) return reject(err);

		connection.query(sql, array, function (err, rows) {
		  
			if(err)		return reject(err);

			resolve(rows);
		})

		connection.release();

      	}); //End of connection pool

  	});

}

var getAgentId = function(saleId)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = 'SELECT agentId FROM Sale WHERE saleId = ?';

		var array = [saleId];

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	    if(err) return reject(err);

		connection.query(sql, array, function (err, rows) {
		  
			if(err)		return reject(err);

			resolve(rows);
		})

		connection.release();

      	}); //End of connection pool

  	});

}

var postMessage = function(userId, role, agentId, saleId, messageContent)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = ['INSERT INTO SaleMessages (userId, agentId, date, saleId, messageContent, role, messageId)',
			'VALUES(?, ?, ?, ?, ?, ?, ?)'].join(" ");

		var currentTimestamp = moment().unix();
  		var datePosted = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
  		var messageId = uuidv4({msecs: new Date('2011-11-01').getTime()});

		var array = [userId, agentId, datePosted, saleId, messageContent, role, messageId];

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err) console.log(err);

	      connection.query(sql, array, function (err, rows) {


	      	console.log(this.sql);
	          
	          if(err)	{
	          	return reject(err);
	          }
	          resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

module.exports.getSaleMessages = getSaleMessages;
module.exports.getAgentId = getAgentId;
module.exports.postMessage = postMessage;