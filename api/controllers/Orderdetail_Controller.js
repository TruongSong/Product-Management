'use strict';
var Orderdetail = require('../models/orderdetail.js');


exports.GetAllOrderdetail = function (req, res) {
     Orderdetail.GetAllOrderdetail(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetOrderdetailByID = function (req, res) {
     let id = req.params.id;
     Orderdetail.GetOrderdetailByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateOrderdetail = function (req, res) {
     let content = new Orderdetail(req.body);
     //handles null error 	
     if (!content.id || !content.orderid || !content.itemid || !content.quatity || !content.price ) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập đầy đủ thông tin nếu muốn thêm vào !' });
     }
     else {
          Orderdetail.CreateOrderdetail(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateOrderdetail = function (req, res) {
     let id = req.params.id;
     let content = new Orderdetail(req.body);
     Orderdetail.UpdateOrderdetail(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteOrderdetail = function (req, res) {
     const id = req.params.id;
     Orderdetail.DeleteOrderdetail(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};