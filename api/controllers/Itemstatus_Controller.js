'use strict';
var Itemstatus = require('../models/itemstatus.js');


exports.GetAllItemstatus = function (req, res) {
     Itemstatus.GetAllItemstatus(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetItemstatusByID = function (req, res) {
     let id = req.params.id;
     Itemstatus.GetItemstatusByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateItemstatus = function (req, res) {
     let content = new Itemstatus(req.body);
     //handles null error 	
     if (!content.statusid || !content.statusname) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập mã / trạng thái !' });
     }
     else {
          Itemstatus.CreateItemstatus(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateItemstatus = function (req, res) {
     let id = req.params.id;
     let content = new Itemstatus(req.body);
     Itemstatus.UpdateItemstatus(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteItemstatus = function (req, res) {
     const id = req.params.id;
     Itemstatus.DeleteItemstatus(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};