'use strict';
let sql = require('./db.js');




let Order = function (order) {
     //console.log(task); 
     this.orderid = order.orderid;
     this.orderdate = order.orderdate;
     this.estimateddelivery = order.estimateddelivery;
     this.delivery = order.delivery;
     this.total = order.total;
     this.customerid = order.customerid;
     this.address = order.address;
     this.note = order.note;
     this.statusid = order.statusid;
     this.accountid = order.accountid;

};


Order.CreateOrder = function CreateOrder(content, result) {

     //kiem tra khoa chinh
     sql.query("Select id from order where orderid=?", [content.orderid], function (err, res) {
          if (res.length > 0) {

               result("error: Mã orderid đã tồn tại, vui lòng đặt mã khác!");
          }
          else {
               // Kiểm tra khóa ngoại statusid (orderstatus)
               sql.query("Select statusid from orderstatus where statusid=?", [content.statusid], function (err, res) {
                    if (res.length == 0) {

                         result("error: mã statusid không tồn tại trong bang orderstatus, vui lòng xem lại!");
                    }
                    else {
                         // Kiểm tra khóa ngoại accountid (account)
                         sql.query("Select accountid from account where accountid=?", [content.accountid], function (err, res) {
                              if (res.length == 0) {

                                   result("error: mã accountid không tồn tại trong bang account, vui lòng xem lại!");
                              } else {
                                   // Kiểm tra khóa ngoại customerid (customer)
                                   sql.query("Select customerid from customer where customerid=?", [content.customerid], function (err, res) {
                                        if (res.length == 0) {

                                             result("error: mã customerid không tồn tại trong bang customer, vui lòng xem lại!");
                                        } else {

                                             let query = "INSERT INTO order set ?";
                                             sql.query(query, [content], function (err, res) {

                                                  if (err) {
                                                       console.log("error: ", err);
                                                       result(err, null);
                                                  }
                                                  else {
                                                       if (res.affectedRows == 1) {
                                                            result("Inserted Order successfully");
                                                       } else {
                                                            result("Inserted Order failed");

                                                       }
                                                  }
                                             });
                                        }
                                   });

                              }
                         });

                    }
               });
          }
     });

};


Order.GetAllOrder = function GetAllOrder(result) {
     let query = "Select * from order";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Order : ', res);
               result(null, res);
          }
     });
};


Order.GetOrderByID = function GetOrderByID(id, result) {
     sql.query("Select * from order where orderid=?", [id], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('Order : ', res);
               result(null, res);
          }
     });
};


Order.UpdateOrder = function (id, content, result) {

     if (!content.orderdate || !content.estimateddelivery || !content.delivery || !content.total || !content.customerid || !content.address || !content.note || !content.statusid || !content.accountid) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          // Kiểm tra khóa ngoại statusid (orderstatus)
          sql.query("Select statusid from orderstatus where statusid=?", [content.statusid], function (err, res) {
               if (res.length == 0) {

                    result("error: mã statusid không tồn tại trong bang orderstatus, vui lòng xem lại!");
               }
               else {
                    // Kiểm tra khóa ngoại accountid (account)
                    sql.query("Select accountid from account where accountid=?", [content.accountid], function (err, res) {
                         if (res.length == 0) {

                              result("error: mã accountid không tồn tại trong bang account, vui lòng xem lại!");
                         } else {
                              // Kiểm tra khóa ngoại customerid (customer)
                              sql.query("Select customerid from customer where customerid=?", [content.customerid], function (err, res) {
                                   if (res.length == 0) {

                                        result("error: mã customerid không tồn tại trong bang customer, vui lòng xem lại!");
                                   } else {

                                        let query = "UPDATE `order` SET `orderdate`= ?,`estimateddelivery`= ?,`delivery`= ?,`total`= ?,`customerid`= ?,`address`= ? ,`note`= ?,`statusid`= ?,`accountid`= ? WHERE `orderid`= ?";
                                        sql.query(query, [content.orderdate, content.estimateddelivery, content.delivery, content.total, content.customerid, content.address, content.note, content.statusid, content.accountid, id], function (err, res) {

                                             if (err) {
                                                  console.log("error: ", err);
                                                  result(err, null);
                                             }
                                             else {
                                                  if (res.affectedRows == 1) {
                                                       result("Updated Order successfully");
                                                  } else {
                                                       result("Updated Order failed");

                                                  }
                                             }
                                        });
                                   }
                              });

                         }
                    });

               }
          });
     }

};


Order.DeleteOrder = function (id, result) {

     //kiem tra khoa ngoai 
     let sql1 = "Select orderid from `orderdetail` where orderid=?";
     sql.query(sql1, [id],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Đơn hàng  này tồn tại trong bảng orderdetail , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `order` where `orderid`=?";
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

module.exports = Order;
