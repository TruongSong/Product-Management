'use strict';
var sql = require('./db.js');

var Orderstatus = function (orderstatus) {
     //console.log(task); 
     this.statusid  = orderstatus.statusid ;
     this.statusname = orderstatus.statusname;
};


Orderstatus.CreateOrderstatus = function CreateOrderstatus(content, result) {
     let query = "INSERT INTO orderstatus set ?";
     sql.query(query, content, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(err, null);
          }
          else {
               if (res.affectedRows == 1) {
                    result("Inserted orderstatus successfully");
               } else {
                    result("Inserted orderstatus failed");

               }
          }
     });
};


Orderstatus.GetAllOrderstatus = function GetAllOrderstatus(result) {
     let query = "Select * from orderstatus";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('orderstatus : ', res);
               result(null, res);
          }
     });
};


Orderstatus.GetOrderstatusByID = function GetOrderstatusByID(id, result) {
     sql.query("Select * from orderstatus where statusid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('orderstatus : ', res);
               result(null, res);
          }
     });
};


Orderstatus.UpdateOrderstatus = function (id, content, result) {

     let query = "UPDATE `orderstatus` SET `statusname`= ? WHERE `statusid` = ?";
     if(!content.statusname ) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          sql.query(query, [content.statusname, id], function (err, res) {
               if (err) {
                    console.log("error: ", err);
                    result(null, err);
               }
               else {
     
                    if (res.changedRows == 1) {
                         result('Updated orderstatus successfully');
                    } else {
                         result('Updated orderstatus Failed');
                    }
     
               }
          });
     }
     


};


Orderstatus.DeleteOrderstatus = function (id, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select statusid from `order` where statusid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Danh mục orderstatus này tồn tại trong bang order , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `orderstatus` where `statusid`=?";
                    sql.query(sql2, [id],
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
module.exports = Orderstatus;
