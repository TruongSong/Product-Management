'use strict';
var sql = require('./db.js');

var Role = function (role) {
     //console.log(task); 
     this.roleid  = role.roleid;
     this.rolename = role.rolename;
};


Role.CreateRole = function CreateRole(content, result) {
     let query = "INSERT INTO role set ?";
     sql.query(query, content, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(err, null);
          }
          else {
               if (res.affectedRows == 1) {
                    result("Inserted Role successfully");
               } else {
                    result("Inserted Role failed");

               }
          }
     });
};


Role.GetAllRole = function GetAllRole(result) {
     let query = "Select * from role";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Role : ', res);
               result(null, res);
          }
     });
};


Role.GetRoleByID = function GetRoleByID(id, result) {
     sql.query("Select * from role where roleid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Role : ', res);
               result(null, res);
          }
     });
};


Role.UpdateRole = function (id, content, result) {

     let query = "UPDATE `role` SET `rolename`= ? WHERE `roleid` = ?";
     if(!content.rolename ) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          sql.query(query, [content.rolename, id], function (err, res) {
               if (err) {
                    console.log("error: ", err);
                    result(null, err);
               }
               else {
     
                    if (res.changedRows == 1) {
                         result('Updated Role successfully');
                    } else {
                         result('Updated Role Failed');
                    }
     
               }
          });
     }
     


};


Role.DeleteRole = function (id, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select roleid from `account` where roleid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Danh mục Role này tồn tại trong bang account , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `role` where `roleid`=?";
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
module.exports = Role;
