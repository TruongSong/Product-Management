'use strict';

module.exports = function (app) {
	var category = require('../controllers/Category_Controller.js');
	var unit = require('../controllers/Unit_Controller.js');
	var itemstatus = require('../controllers/Itemstatus_Controller.js');
	var orderstatus = require('../controllers/Orderstatus_Controller.js');
	var role = require('../controllers/Role_Controller.js');
	var account = require('../controllers/Account_Controller.js');
	var customer = require('../controllers/Customer_Controller.js');
	var orderdetail = require('../controllers/Orderdetail_Controller.js');
	var order = require('../controllers/Order_Controller.js');

	var item = require('../controllers/Item_Controller.js');
	// todoList Routes 
	//Category
	app.route('/api/v1/categories')
		.get(category.GetAllCategory)
		.post(category.CreateCategory);

	app.route('/api/v1/categories/:id')
		.get(category.GetCategoryByID)
		.put(category.UpdateCategory)
		.delete(category.DeleteCategory);
	//end Category


	//unit
	app.route('/api/v1/units')
		.get(unit.GetAllUnit)
		.post(unit.CreateUnit);

	app.route('/api/v1/units/:id')
		.get(unit.GetUnitByID)
		.put(unit.UpdateUnit)
		.delete(unit.DeleteUnit);
	//end unit


	//itemstatus
	app.route('/api/v1/itemstatus')
		.get(itemstatus.GetAllItemstatus)
		.post(itemstatus.CreateItemstatus);

	app.route('/api/v1/itemstatus/:id')
		.get(itemstatus.GetItemstatusByID)
		.put(itemstatus.UpdateItemstatus)
		.delete(itemstatus.DeleteItemstatus);
	//end itemstatus


	//orderstatus
	app.route('/api/v1/orderstatus')
		.get(orderstatus.GetAllOrderstatus)
		.post(orderstatus.CreateOrderstatus);

	app.route('/api/v1/orderstatus/:id')
		.get(orderstatus.GetOrderstatusByID)
		.put(orderstatus.UpdateOrderstatus)
		.delete(orderstatus.DeleteOrderstatus);
	//end orderstatus

	//role
	app.route('/api/v1/role')
		.get(role.GetAllRole)
		.post(role.CreateRole);

	app.route('/api/v1/role/:id')
		.get(role.GetRoleByID)
		.put(role.UpdateRole)
		.delete(role.DeleteRole);
	//end role


	//account
	app.route('/api/v1/account')
		.get(account.GetAllAccount)
		.post(account.CreateAccount);

	app.route('/api/v1/account/:id')
		.get(account.GetAccountByID)
		.put(account.UpdateAccount)
		.delete(account.DeleteAccount);
	//end account


	//customer
	app.route('/api/v1/customer')
		.get(customer.GetAllCustomer)
		.post(customer.CreateCustomer);

	app.route('/api/v1/customer/:id')
		.get(customer.GetCustomerByID)
		.put(customer.UpdateCustomer)
		.delete(customer.DeleteCustomer);
	//end customer

	//orderdetail
	app.route('/api/v1/orderdetail')
		.get(orderdetail.GetAllOrderdetail)
		.post(orderdetail.CreateOrderdetail);

	app.route('/api/v1/orderdetail/:id')
		.get(orderdetail.GetOrderdetailByID)
		.put(orderdetail.UpdateOrderdetail)
		.delete(orderdetail.DeleteOrderdetail);
	//end orderdetail


	//order
	app.route('/api/v1/order')
		.get(order.GetAllOrder)
		.post(order.CreateOrder);

	app.route('/api/v1/order/:id')
		.get(order.GetOrderByID)
		.put(order.UpdateOrder)
		.delete(order.DeleteOrder);
	//end order


	//item
	app.route('/api/v1/items')
		.get(item.GetAllItem)
		.post(item.CreateItem);

	app.route('/api/v1/items/:id')
		.get(item.GetItemByID)
		.put(item.UpdateItemByID)
		.delete(item.DeleteItemByID);


	app.route('/api/v1/items/:name/:price')
		.get(item.SearchbyParameters);

	app.route('/api/v1/items/search')
		.get(item.SearchbyQueryString);

	app.route('/api/v1/items/:APIKEY/:itemid')
		.delete(item.DeleteItem)
		.put(item.UpdateItem);

	//end item
};