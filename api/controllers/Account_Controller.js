'use strict';
var Account = require('../models/account.js');


exports.GetAllAccount = function (req, res) {
     Account.GetAllAccount(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetAccountByID = function (req, res) {
     let id = req.params.id;
     Account.GetAccountByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateAccount = function (req, res) {
     let content = new Account(req.body);
     //handles null error 	
     if (!content.username || !content.password || !content.name || !content.email || !content.phone || !content.roleid || !content.status) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập đầy đủ thông tin nếu muốn thêm vào !' });
     }
     else {
          Account.CreateAccount(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateAccount = function (req, res) {
     let id = req.params.id;
     let content = new Account(req.body);
     Account.UpdateAccount(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteAccount = function (req, res) {
     const id = req.params.id;
     Account.DeleteAccount(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};