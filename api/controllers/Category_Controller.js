'use strict';
var Category = require('../models/category.js');


exports.GetAllCategory = function (req, res) {
     Category.GetAllCategory(function (err, category) {
          console.log('controller')
          if (err)
               res.send(err);
          console.log('res', category);
          res.send(category);
     });
};


exports.GetCategoryByID = function (req, res) {
     Category.GetCategoryByID(req.params.id, function (err, category) {
          if (err)
               res.send(err);
          res.send(category);
     });
};


exports.CreateCategory = function (req, res) {
     var NewCategory = new Category(req.body);
     //handles null error 	
     if (!NewCategory.categoryid || !NewCategory.categoryname) {
          res.status(400).send({ error: false, message: 'Vui lòng nhập mã / tên danh mục!' });
     }
     else {
          Category.CreateCategory(NewCategory, function (err, category) {
               if (err)
                    res.send(err);
               res.json(category);
          });
     }
};


exports.UpdateCategory = function (req, res) {

     Category.UpdateCategory(req.params.id, new Category(req.body), function (err, category) {
          if (err)
               res.send(err);
          res.json(category);
     });


};


exports.DeleteCategory = function (req, res) {
     const categoryid = req.params.id;

     Category.DeleteCategory(categoryid, function (err, task) {
          if (err)
               res.send(err);
          res.json(task);
     });

};