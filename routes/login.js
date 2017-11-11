var express = require('express');
var router = express.Router();
var db = require('../db');

// Route
router.get('/',function(req,res){
  res.render('login',
    {role: "user"}
  );
});

router.get('/agent*',function(req,res){
  res.render('login',
    {role: "agent"}
  );
});

router.get('/admin*',function(req,res){
  res.render('login',
    {role: "admin"}
  );
});

// Route
router.post('/',function(req,res){
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
router.post('/admin',function(req,res){
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
router.post('/agent',function(req,res){
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

module.exports = router;