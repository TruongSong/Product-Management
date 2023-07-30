'use strict';
var Orderstatus = require('../models/orderstatus.js');


exports.GetAllOrderstatus = function (req, res) {
     Orderstatus.GetAllOrderstatus(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetOrderstatusByID = function (req, res) {
     let id = req.params.id;
     Orderstatus.GetOrderstatusByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateOrderstatus = function (req, res) {
     let content = new Orderstatus(req.body);
     //handles null error 	
     if (!content.statusid || !content.statusname) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập mã / trạng thái !' });
     }
     else {
          Orderstatus.CreateOrderstatus(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateOrderstatus = function (req, res) {
     let id = req.params.id;
     let content = new Orderstatus(req.body);
     Orderstatus.UpdateOrderstatus(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteOrderstatus = function (req, res) {
     const id = req.params.id;
     Orderstatus.DeleteOrderstatus(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};