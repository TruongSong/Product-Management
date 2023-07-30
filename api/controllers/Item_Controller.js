'use strict'; 
var Item = require('../models/item.js');
exports.CreateItem = function(req, res) { 
	var new_item = new Item(req.body); 
	Item.Createitem(new_item, function(err, item) { 
		if (err) 
			res.send(err); 
		res.json(item);
	}); 	
};


exports.GetAllItem = function(req, res) { 
	//kiểm tra xem có cung cấp APIKEY không?
	const {APIKEY} = req.query;
	if(!APIKEY){
		res.status(401).send("Vui lòng cung cấp APIKEY để xác thực!");
	}
	else{
		Item.GetAllItem(APIKEY,function(err, item) { 
			if (err)
				res.status(err.status).send(err.info);
			else 
				res.send(item); 
		}); 
	}
};


exports.GetItemByID = function (req, res) {
     let id = req.params.id;
     Item.GetItemByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.send(result);
     });
};

exports.UpdateItemByID = function (req, res) {
     let id = req.params.id;
     let content = new Item(req.body);
     Item.UpdateItemByID(id, content, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });


};

exports.DeleteItemByID = function (req, res) {
     const id = req.params.id;
     Item.DeleteItemByID(id, function (err, result) {
          if (err)
               res.send(err);
          res.json(result);
     });

};

exports.UpdateItem = function(req,res) {
	//kiem tra apikey va item
	const {APIKEY,itemid} = req.params;
	let content = new Item(req.body);
	if(!APIKEY) {
		res.status(401).send("Vui lòng cung cấp APIKEY để xác thực!");
	} else {
		if(!itemid) {
			res.status(422).send("Vui lòng cung cấp mã sản phẩm cần xóa!");
		} else {
			Item.UpdateItem(APIKEY, itemid ,content,function(err, item) { 
				if (err)
					res.send(err);
				else 
					res.status(200).send(item);
			}); 
		}
	}
};


exports.DeleteItem = function(req, res) { 
	//kiểm tra xem có cung cấp APIKEY và itemid không?
	const {APIKEY,itemid} = req.params;
	if(!APIKEY){
		res.status(401).send("Vui lòng cung cấp APIKEY để xác thực!");
	}else if(!itemid){
		res.status(422).send("Vui lòng cung cấp mã sản phẩm cần xóa!");
	}
	else{
		Item.Deleteitem(APIKEY, itemid,function(err, item) { 
			if (err)
				res.status(err.status).send(err.info);
			else 
				res.status(200).send("Xóa thành công!");
		}); 
	}
};

exports.SearchbyQueryString = function(req, res) { 
	const { name, price } = req.query;
	if(name && price){
		Item.SearchItems(name, price,function(err, item) { 
			if (err)
				res.send(err); 
			res.send(item); 
		}); 
	}
	else
		res.send("Vui lòng nhập name và price cần tìm");
};
exports.SearchbyParameters = function(req, res) { 
	const { name, price } = req.params;
	if(name && price){
		Item.SearchItems(name, price,function(err, item) { 
			if (err)
				res.send(err); 
			res.send(item); 
		}); 
	}
	else
		res.send("Vui lòng nhập name và price cần tìm");
};