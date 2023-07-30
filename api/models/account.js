'use strict';
let sql = require('./db.js');
const md5 = require('md5');



let Account = function (account) {
     //console.log(task); 
     this.accountid = account.accountid;
     this.username = account.username;
     this.password = account.password;
     this.name = account.name;
     this.email = account.email;
     this.phone = account.phone;
     this.roleid = account.roleid;
     this.status = account.status;
     this.APIKEY = account.APIKEY;
};


Account.CreateAccount = function CreateAccount(content, result) {

     //kiem tra khoa chinh
     sql.query("Select accountid from account where accountid=?", [content.accountid], function (err, res) {
          if (res.length > 0) {

               result("error: Mã tài khoản đã tồn tại, vui lòng đặt mã khác!");
          }
          else {
               // Kiểm tra khóa ngoại quyền role (roleid)
               sql.query("Select roleid from role where roleid=?", [content.roleid],  function (err, res) {
                    if (res.length == 0) {
                    
                         result("error: mã roleid không tồn tại trong bang role, vui lòng xem lại!");
                    }
                    else {
                         
                         let query = "INSERT INTO `account`(`accountid`, `username`, `password`, `name`, `email`, `phone`, `roleid`, `status`, `APIKEY`) VALUES ( ? , ? , ? , ?, ? , ? , ? , ? , ?)";
                         sql.query(query, [content.accountid, content.username, md5(content.password), content.name, content.email, content.phone, content.roleid, content.status, md5(content.APIKEY)], function (err, res) {

                              if (err) {
                                   console.log("error: ", err);
                                   result(err, null);
                              }
                              else {
                                   if (res.affectedRows == 1) {
                                        result("Inserted Account successfully");
                                   } else {
                                        result("Inserted Account failed");

                                   }
                              }
                         });
                    }
               });
          }
     });

};


Account.GetAllAccount = function GetAllAccount(result) {
     let query = "Select * from account";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Account : ', res);
               result(null, res);
          }
     });
};


Account.GetAccountByID = function GetAccountByID(id, result) {
     sql.query("Select * from account where accountid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Account : ', res);
               result(null, res);
          }
     });
};


Account.UpdateAccount =  function (id, content, result) {
 
     if (!content.username || !content.password || !content.name || !content.email || !content.phone || !content.roleid || !content.status) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          //kiem tra khoa ngoai roleid

          sql.query("Select roleid from `role` where roleid=?", [content.roleid],
               function (err, res) {
                    if (res.length == 0) {
                         result( "roleid này không tồn tại trong bảng role ! vui lòng chọn lại roleid ?" );
                    }
                    else {

                         let query = "UPDATE `account` SET `username`= ?,`password`= ?,`name`= ?,`email`= ?,`phone`= ?,`roleid`= ?,`status`= ?,`APIKEY`= ? WHERE `accountid`= ?";
                         sql.query(query, [content.username, md5(content.password), content.name, content.email, content.phone, content.roleid, content.status, md5(content.APIKEY), id], function (err, res) {
                              if (err) {
                                   console.log("error: ", err);
                                   result(null, err);
                              }
                              else {

                                   if (res.changedRows == 1) {
                                        result('Updated Account successfully');
                                   } else {
                                        result('Updated Account Failed');
                                   }

                              }
                         });
                    }
               });
     }



};


Account.DeleteAccount = function (id, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select accountid from `order` where accountid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Tài khoản này tồn tại trong bảng order , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `account` where `accountid`=?";
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
module.exports = Account;
