'use strict';
var Role = require('../models/role.js');


exports.GetAllRole = function (req, res) {
     Role.GetAllRole(function (err, result) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', result);
          res.send(result);
     });
};


exports.GetRoleByID = function (req, res) {
     let id = req.params.id;
     Role.GetRoleByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};


exports.CreateRole = function (req, res) {
     let content = new Role(req.body);
     //handles null error 	
     if (!content.roleid || !content.rolename) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập mã roleid / rolename !' });
     }
     else {
          Role.CreateRole(content, function (err, result) {
               if (err)
                    res.send(err);
               res.json(result);
          });
     }
};


exports.UpdateRole = function (req, res) {
     let id = req.params.id;
     let content = new Role(req.body);
     Role.UpdateRole(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};


exports.DeleteRole = function (req, res) {
     const id = req.params.id;
     Role.DeleteRole(id, function (err, result) {
          if (err)
               res.send(err);
          console.log(res);
          res.json(result);
     });

};