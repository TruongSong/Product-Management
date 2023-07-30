'use strict';
let sql = require('./db.js');




let Orderdetail = function (orderdetail) {
     //console.log(task); 
     this.id = orderdetail.id;
     this.orderid = orderdetail.orderid;
     this.itemid = orderdetail.itemid;
     this.quatity = orderdetail.quatity;
     this.price = orderdetail.price;

};


Orderdetail.CreateOrderdetail = function CreateOrderdetail(content, result) {

     //kiem tra khoa chinh
     sql.query("Select id from orderdetail where id=?", [content.id], function (err, res) {
          if (res.length > 0) {

               result("error: Mã id đã tồn tại, vui lòng đặt mã khác!");
          }
          else {
               // Kiểm tra khóa ngoại quyền orderid (order)
               sql.query("Select orderid from order where orderid=?", [content.orderid], function (err, res) {
                    if (res.length == 0) {

                         result("error: mã orderid không tồn tại trong bang order, vui lòng xem lại!");
                    }
                    else {
                         // Kiểm tra khóa ngoại quyền itemid (item)
                         sql.query("Select itemid from item where itemid=?", content.itemid, function (err, res) {

                              if (res.length == 0) {

                                   result("error: mã itemid không tồn tại trong bang item, vui lòng xem lại!");
                              } else {

                                   let query = "INSERT INTO `orderdetail`(`id`, `orderid`, `itemid`, `quatity`, `price`) VALUES ( ? , ? , ? , ?, ? )";
                                   sql.query(query, [content.id, content.orderid, content.itemid, content.quatity, content.price], function (err, res) {

                                        if (err) {
                                             console.log("error: ", err);
                                             result(err, null);
                                        }
                                        else {
                                             if (res.affectedRows == 1) {
                                                  result("Inserted Orderdetail successfully");
                                             } else {
                                                  result("Inserted Orderdetail failed");

                                             }
                                        }
                                   });
                              }
                         });

                    }
               });
          }
     });

};


Orderdetail.GetAllOrderdetail = function GetAllOrderdetail(result) {
     let query = "Select * from orderdetail";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Orderdetail : ', res);
               result(null, res);
          }
     });
};


Orderdetail.GetOrderdetailByID = function GetOrderdetailByID(id, result) {
     sql.query("Select * from orderdetail where id=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Orderdetail : ', res);
               result(null, res);
          }
     });
};


Orderdetail.UpdateOrderdetail = function (id, content, result) {

     if (!content.orderid || !content.itemid || !content.quatity || !content.price ) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          //kiem tra khoa ngoai orderid(order)

          sql.query("Select orderid from `order` where orderid=?", [content.orderid],
               function (err, res) {
                    if (res.length == 0) {
                         result("orderid này không tồn tại trong bảng order ! vui lòng chọn lại orderid ?");
                    }
                    else {

                         // Kiểm tra khóa ngoại quyền itemid (item)
                         sql.query("Select itemid from item where itemid=?", content.itemid, function (err, res) {

                              if (res.length == 0) {

                                   result("error: mã itemid không tồn tại trong bang item, vui lòng xem lại itemid !");
                              } else {

                                   let query = "UPDATE `orderdetail` SET `orderid`= ?,`itemid`= ?,`quatity`= ?,`price`= ? WHERE `id`= ?";
                                   sql.query(query, [content.orderid, content.itemid, content.quatity, content.price, id], function (err, res) {

                                        if (err) {
                                             console.log("error: ", err);
                                             result(err, null);
                                        }
                                        else {
                                             if (res.affectedRows == 1) {
                                                  result("Updated Orderdetail successfully");
                                             } else {
                                                  result("Updated Orderdetail failed");

                                             }
                                        }
                                   });
                              }
                         });
                    }
               });
     }



};


Orderdetail.DeleteOrderdetail = function (id, result) {


     let sql2 = "Delete from `Orderdetail` where `id`= ?";
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

};

module.exports = Orderdetail;
