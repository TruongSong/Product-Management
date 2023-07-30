'use strict';
var sql = require('./db.js');

var Itemstatus = function (itemstatus) {
     //console.log(task); 
     this.statusid  = itemstatus.statusid ;
     this.statusname = itemstatus.statusname;
};


Itemstatus.CreateItemstatus = function CreateItemstatus(content, result) {
     let query = "INSERT INTO itemstatus set ?";
     sql.query(query, content, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(err, null);
          }
          else {
               if (res.affectedRows == 1) {
                    result("Inserted itemstatus successfully");
               } else {
                    result("Inserted itemstatus failed");

               }
          }
     });
};


Itemstatus.GetAllItemstatus = function GetAllItemstatus(result) {
     let query = "Select * from itemstatus";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('itemstatus : ', res);
               result(null, res);
          }
     });
};


Itemstatus.GetItemstatusByID = function GetItemstatusByID(id, result) {
     sql.query("Select * from itemstatus where statusid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('itemstatus : ', res);
               result(null, res);
          }
     });
};


Itemstatus.UpdateItemstatus = function (id, content, result) {

     let query = "UPDATE `itemstatus` SET `statusname`= ? WHERE `statusid` = ?";
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
                         result('Updated itemstatus successfully');
                    } else {
                         result('Updated itemstatus Failed');
                    }
     
               }
          });
     }
     


};


Itemstatus.DeleteItemstatus = function (id, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select statusid from `item` where statusid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Danh mục Itemstatus này tồn tại trong sản phẩm , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `itemstatus` where `statusid`=?";
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
module.exports = Itemstatus;
