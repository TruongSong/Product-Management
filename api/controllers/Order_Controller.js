'use strict';
var Order = require('../models/order.js');


exports.GetAllOrder = function (req, res) {
     Order.GetAllOrder(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetOrderByID = function (req, res) {
     let id = req.params.id;
     Order.GetOrderByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateOrder = function (req, res) {
     let content = new Order(req.body);
     //handles null error 	
     if (!content.orderid || !content.orderdate || !content.estimateddelivery || !content.delivery || !content.total || !content.customerid || !content.address || !content.note || !content.statusid || !content.accountid  ) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập đầy đủ thông tin nếu muốn thêm vào !' });
     }
     else {
          Order.CreateOrder(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateOrder = function (req, res) {
     let id = req.params.id;
     let content = new Order(req.body);
     Order.UpdateOrder(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteOrder = function (req, res) {
     const id = req.params.id;
     Order.DeleteOrder(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};