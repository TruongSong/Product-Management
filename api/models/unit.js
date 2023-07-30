'use strict';
var sql = require('./db.js');

var Unit = function (unit) {
     //console.log(task); 
     this.unitid = unit.unitid;
     this.unitname = unit.unitname;
     this.description = unit.description;
};


Unit.CreateUnit = function CreateUnit(NewUnit, result) {
     let query = "INSERT INTO unit set ?";
     sql.query(query, NewUnit, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(err, null);
          }
          else {
               if (res.affectedRows == 1) {
                    result("Inserted Unit successfully");
               } else {
                    result("Inserted Unit failed");

               }
          }
     });
};


Unit.GetAllUnit = function GetAllUnit(result) {
     let query = "Select * from unit";
     sql.query(query, function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('unit : ', res);
               result(null, res);
          }
     });
};


Unit.GetUnitByID = function GetUnitByID(unitid, result) {
     sql.query("Select * from unit where unitid=?", [unitid], function (err, res) {
          if (err) {
               console.log("error: ", err);
               result(null, err);
          }
          else {
               console.log('unit : ', res);
               result(null, res);
          }
     });
};


Unit.UpdateUnit = function (unitid, unit, result) {

     let query = "UPDATE `unit` SET `unitname`= ?,`description`= ? WHERE `unitid` = ?";
     if(!unit.unitname || !unit.description) {
          result('Vui lòng nhập đầy đủ thông tin nếu muốn cập nhập dữ liệu');
     } else {
          sql.query(query, [unit.unitname, unit.description, unitid], function (err, res) {
               if (err) {
                    console.log("error: ", err);
                    result(null, err);
               }
               else {
     
                    if (res.changedRows == 1) {
                         result('Updated unit successfully');
                    } else {
                         result('Updated unit Failed');
                    }
     
               }
          });
     }
     


};


Unit.DeleteUnit = function (unitid, result) {
     //kiem tra khoa ngoai 
     let sql1 = "Select unitid from `item` where unitid=?";
     sql.query(sql1, [unitid],
          function (err, res) {
               if (res.length > 0) {
                    result({ "status": 403, "info": "Danh mục Unit này tồn tại trong sản phẩm , không được xóa!" });
               }
               else {
                    let sql2 = "Delete from `unit` where `unitid`=?";
                    sql.query(sql2, [unitid],
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
module.exports = Unit;
