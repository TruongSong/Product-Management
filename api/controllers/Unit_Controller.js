'use strict';
var Unit = require('../models/unit.js');


exports.GetAllUnit = function (req, res) {
     Unit.GetAllUnit(function (err, unit) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', unit);
          res.send(unit);
     });
};


exports.GetUnitByID = function (req, res) {
     Unit.GetUnitByID(req.params.id, function (err, unit) {
          if (err)
               res.send(err);
          res.send(unit);
     });
};


exports.CreateUnit = function (req, res) {
     var NewUnit = new Unit(req.body);
     //handles null error 	
     if (!NewUnit.unitid || !NewUnit.unitname) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập mã / Đơn vị tính!' });
     }
     else {
          Unit.CreateUnit(NewUnit, function (err, unit) {
               if (err)
                    res.send(err);
               res.json(unit);
          });
     }
};


exports.UpdateUnit = function (req, res) {

     Unit.UpdateUnit(req.params.id, new Unit(req.body), function (err, unit) {
          if (err)
               res.send(err);
          res.json(unit);
     });


};


exports.DeleteUnit = function (req, res) {
     const unitid = req.params.id;
     Unit.DeleteUnit(unitid, function (err, task) {
          if (err)
               res.send(err);
               console.log(res);
          res.json(task);
     });

};