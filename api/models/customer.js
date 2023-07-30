'use strict';
let sql = require('./db.js');
const md5 = require('md5');



let Customer = function (customer) {
     //console.log(task); 
     this.customerid = customer.customerid;
     this.phone = customer.phone;
     this.password = customer.password;
     this.name = customer.name;
     this.address = customer.address;
     this.email = customer.email;
     this.avatar = customer.avatar;

};


Customer.CreateCustomer = function CreateCustomer(content, result) {

     //kiem tra khoa chinh
     sql.query("Select customerid from customer where customerid=?", [content.customerid], function (err, res) {
          if (res.length > 0) {

               result("error: Mã khách hàng đã tồn tại, vui lòng đặt mã khác!");
          }
          else {
               // Kiểm tra khóa ngoại customerid (order) 
               sql.query("Select customerid from order where customerid=?", [content.customerid], function (err, res) {
                    if (res.length == 0) {

                         result("error: mã khách hàng  không tồn tại trong bảng order, vui lòng xem lại!");
                    }
                    else {

                         let query = "INSERT INTO `customer`(`customerid`, `phone`, `password`, `name`, `address`, `email`, `avatar`) VALUES ( ? , ? , ? , ?, ? , ? , ? )";
                         sql.query(query, [content.customerid, content.phone, md5(content.password), content.name, content.address, content.email, content.avatar], function (err, res) {

                              if (err) {
                                   console.log("error: ", err);
                                   result(err, null);
                              }
                              else {
                                   if (res.affectedRows == 1) {
                                        result("Inserted Customer successfully");
                                   } else {
                                        result("Inserted Customer failed");

                                   }
                              }
                         });
                    }
               });
          }
     });

};


Customer.GetAllCustomer = function GetAllCustomer(result) {
     let query = "Select * from customer";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Customer : ', res);
               result(null, res);
          }
     });
};


Customer.GetCustomerByID = function GetCustomerByID(id, result) {
     sql.query("Select * from customer where customerid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Customer : ', res);
               result(null, res);
          }
     });
};


Customer.UpdateCustomer = function (id, content, result) {

     if (!content.phone || !content.password || !content.name || !content.address || !content.email || !content.avatar) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {

          let query = "UPDATE `customer` SET `phone`= ?,`password`= ?,`name`= ?,`address`= ?,`email`= ?,`avatar`= ? WHERE `customerid`= ?";
          sql.query(query, [content.phone, md5(content.password), content.name, content.address, content.email, content.avatar, id], function (err, res) {
               if (err) {
                    console.log("error: ", err);
                    result(null, err);
               }
               else {

                    if (res.changedRows == 1) {
                         result('Updated Customer successfully');
                    } else {
                         result('Updated Customer Failed');
                    }

               }
          });

     }

};


Customer.DeleteCustomer = function (id, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select customerid from `order` where customerid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Khách hàng này tồn tại trong bảng order , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `customer` where `customerid`=?";
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
module.exports = Customer;
