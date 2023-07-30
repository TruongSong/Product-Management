'use strict';
var Customer = require('../models/customer.js');


exports.GetAllCustomer = function (req, res) {
     Customer.GetAllCustomer(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetCustomerByID = function (req, res) {
     let id = req.params.id;
     Customer.GetCustomerByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateCustomer = function (req, res) {
     let content = new Customer(req.body);
     //handles null error 	
     if (!content.customerid || !content.phone || !content.password || !content.name || !content.address || !content.email || !content.avatar) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập đầy đủ thông tin nếu muốn thêm vào !' });
     }
     else {
          Customer.CreateCustomer(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateCustomer = function (req, res) {
     let id = req.params.id;
     let content = new Customer(req.body);
     Customer.UpdateCustomer(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteCustomer = function (req, res) {
     const id = req.params.id;
     Customer.DeleteCustomer(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};