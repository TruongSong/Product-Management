'use strict';
var sql = require('./db.js');

var Category = function (category) {
     //console.log(task); 
     this.categoryid = category.categoryid;
     this.categoryname = category.categoryname;
     this.description = category.description;
};


Category.CreateCategory = function CreateCategory(NewCategory, result) {
     let query = "INSERT INTO category set ?";

     sql.query(query, NewCategory, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(err, null);
          }
          else {
               if (res.affectedRows == 1) {
                    result("Inserted Category successfully");
               } else {
                    result("Inserted Category failed");

               }
          }
     });
};


Category.GetAllCategory = function GetAllCategory(result) {
     let query = "Select * from category";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('category : ', res);
               result(null, res);
          }
     });
};


Category.GetCategoryByID = function GetCategoryByID(categoryid, result) {
     sql.query("Select * from category where categoryid=?", [categoryid], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('category : ', res);
               result(null, res);
          }
     });
};


Category.UpdateCategory = function (categoryid, category, result) {

     let query = "UPDATE `category` SET `categoryname`= ?,`description`= ? WHERE `categoryid` = ?";
     if(!category.categoryname || !category.description) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          sql.query(query, [category.categoryname, category.description, categoryid], function (err, res) {
               if (err) {
                    console.log("error: ", err);
                    result(null, err);
               }
               else {
     
                    if (res.changedRows == 1) {
                         result('Updated Category successfully');
                    } else {
                         result('Updated Category Failed');
                    }
     
               }
          });
     }
     


};


Category.DeleteCategory = function (categoryid, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select categoryid from `item` where categoryid=?";
     sql.query(sql1, [categoryid],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Danh mục Category này tồn tại trong sản phẩm  , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `category` where `categoryid`=?";
                    sql.query(sql2, [categoryid],
                         function (err, res) {
                              if (err) {
                                   result(err, null);
                              }
                              else {
                                   if (res.affectedRows == 1) {
                                        result("Delete successfully");
                                   } else {
                                        result("Delete failed");

                                   }
                              }
                         });
               }
          });


};
module.exports = Category;
