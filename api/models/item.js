'use strict';
var sql = require('./db.js');

var Item = function (item) {
	//console.log(task); 
	this.itemid = item.itemid;
	this.itemname = item.itemname;
	this.description = item.description;
	this.price = item.price;
	this.categoryid = item.categoryid;
	this.unitid = item.unitid;
	this.statusid = item.statusid;
	this.image = item.image;
	this.images = item.images;
};


Item.GetAllItem = function GetAllItem(APIKEY, result) {
	//kiểm tra APIKEY có tồn tại không?
	sql.query("SELECT `roleid` FROM `account` WHERE `APIKEY`=?", [APIKEY],
		function (err, res) {
			//nếu câu lệnh SQL lỗi
			if (err) {
				result(null, err);
			}
			//nếu không tồn tại
			else if (res.length == 0) {
				result({ "status": 401, "info": "APIKEY không đúng!" });
			}
			//nếu có tồn tại thì kiểm tra tiếp quyền
			else if (res[0].roleid == "1") {
				result({ "status": 403, "info": "Quyền của bạn không được phép truy cập dữ liệu/chức năng này!" });
			}
			else {
				//nếu ok
				sql.query("Select * from item", function (err, res) {
					if (err) {
						console.log("error: ", err);
						result(null, err);
					}
					else {
						console.log('item : ', res);
						result(null, res);
					}
				});
			}
		});
};


Item.GetItemByID = function GetItemByID(id, result) {
     sql.query("Select * from item where itemid=?", [id], function (err, res) {
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



Item.UpdateItemByID = function (id, content, result) {

	const query = 'UPDATE item SET ? WHERE itemid = ?';
	sql.query(query, [content, id], function (err, res) {
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

};


Item.DeleteItemByID = function (id, result) {

   //kiểm tra khóa ngoại
   sql.query("Select itemid from `orderdetail` where itemid=?", [id],
   function (err, res) {
	   if (res.length > 0) {
		   result({ "status": 403, "info": "Sản phẩm này tồn tại trong Đơn hàng, không được xóa!" });
	   }
	   else {
		   sql.query("Delete from `item` where `itemid`=?", [id],
			   function (err, res) {
				   if (err) {
					   result(err, null);
				   }
				   else {
					   result(null, "Xóa thành công!");
				   }
			   });
	   }
   });
};

Item.SearchItems = function SearchItem(name, price, result) {
	const values = [`%${name}%`, `%${price}%`];
	const S = "SELECT * FROM `item` WHERE `itemname` like ? and `price` like ?";

	sql.query(S, values, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			console.log('item : ', res);
			result(null, res);
		}
	});
};


Item.Createitem = function Createitem(newitem, result) {
	//kiểm tra khóa chính
	sql.query("Select itemid from item where itemid=?", [newitem.itemid], function (err, res) {
		if (res.length > 0) {
		
			result("error: mã sản phẩm đã đặt cho 1 sản phẩm khác, vui lòng đặt mã khác!", err);
		}
		else {
			//giả sử check khóa ngoại là mã danh mục (categoryid)
			sql.query("Select categoryid from category where categoryid=?", [newitem.categoryid], function (err, res) {
				if (res.length == 0) {
										
					result("error: mã danh mục không tồn tại, vui lòng xem lại!");
				}
				else {
					sql.query("INSERT INTO item set ?", newitem, function (err, res) {
						if (err) {
							
							result("error: không thể thêm!");
						}
						else {
						
							result( "Thêm thành công!");
						}
					});
				}
			});
		}
	});
};


Item.UpdateItem = function UpdateItem(APIKEY, itemid , content, result) {
	
	//xac thuc
	sql.query("SELECT `roleid` FROM `account` WHERE `APIKEY`=?", [APIKEY],
		function (err, res) {
			if (res.length == 0) {
				result({ "status": 401, "info": "APIKEY không đúng!" });
			} else {
				if (res[0].roleid == "1") {//quyen admin

					
					// Kiểm tra khóa ngoại categoryid (category)
					sql.query("Select categoryid from category where categoryid=?", [content.categoryid], function (err, res) {
						if (res.length == 0) {

							result("error: mã categoryid không tồn tại trong bang category, vui lòng xem lại!");
						}
						else {
							// Kiểm tra khóa ngoại unitid (unit)
							sql.query("Select unitid from unit where unitid=?", [content.unitid], function (err, res) {
								if (res.length == 0) {

									result("error: mã unitid không tồn tại trong bang unit, vui lòng xem lại!");
								} else {
									// Kiểm tra khóa ngoại statusid (itemstatus)
									sql.query("Select statusid from itemstatus where statusid=?", [content.statusid], function (err, res) {
										if (res.length == 0) {

											result("error: mã statusid không tồn tại trong bang itemstatus, vui lòng xem lại!");
										} else {

											let query = "UPDATE `item` SET `itemname`= ?,`description`= ?,`price`= ?,`categoryid`= ?,`unitid`= ?,`statusid`= ? ,`image`= ?,`images`= ? WHERE `itemid`= ?";
											sql.query(query, [content.itemname, content.description, content.price, content.categoryid, content.unitid, content.statusid, content.image, content.images, itemid], function (err, res) {

										if (err) {
													console.log("error: ", err);
										result(err);
												}
												else {
													if (res.affectedRows == 1) {
														result("Updated Item successfully");
													} else {
														result("Updated Item failed");

													}
												}
											});
										}
									});

								}
							});

						}
					});

				} else {
					result( "status :Quyền của bạn không được phép truy cập dữ liệu/chức năng này!");
				}
			}
		}
	);
};

Item.Deleteitem = function Deleteitem(APIKEY, itemid, result) {
	//xac thuc
	sql.query("SELECT `roleid` FROM `account` WHERE `APIKEY`=?", [APIKEY],
		function (err, res) {
			//nếu câu lệnh SQL lỗi
			if (err) {
				result(null, err);
			}
			//nếu không tồn tại
			else if (res.length == 0) {
				result({ "status": 401, "info": "APIKEY không đúng!" });
			}
			//nếu có tồn tại thì kiểm tra tiếp quyền
			else if (res[0].roleid == "1") {
				result({ "status": 403, "info": "Quyền của bạn không được phép truy cập dữ liệu/chức năng này!" });
			}
			else {
				//kiểm tra khóa ngoại
				sql.query("Select itemid from `orderdetail` where itemid=?", [itemid],
					function (err, res) {
						if (res.length > 0) {
							result({ "status": 403, "info": "Sản phẩm này tồn tại trong Đơn hàng, không được xóa!" });
						}
						else {
							sql.query("Delete from `item` where `itemid`=?", [itemid],
								function (err, res) {
									if (err) {
										result(err, null);
									}
									else {
										result(null, "Xóa thành công!");
									}
								});
						}
					});
			}
		});
};

module.exports = Item;