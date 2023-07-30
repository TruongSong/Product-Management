

const express = require('express');
const path = require('path');

app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(port);
console.log('API server started on: ' + port); app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json());
var routes = require('./api/routes/api_route'); //importing route 
routes(app); //register the route


// Định nghĩa route cho phương thức GET
app.get('/', function(req, res) {
    // Trả về tệp "home.html" từ thư mục views
    res.sendFile(path.join(__dirname, 'api','public', 'home.html'));
  });



  
// Định nghĩa tuyến cho trang chỉnh sửa dữ liệu
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  console.log('ID cần chỉnh sửa:', id);

  // TODO: Xử lý chỉnh sửa dữ liệu theo giá trị của id

  // Điều hướng trình duyệt đến trang "/edit.html" và truyền giá trị id dưới dạng route parameter
  res.sendFile(path.join(__dirname, 'api','public','edit.html'));
});



// Định nghĩa tuyến cho trang chỉnh xoa dữ liệu
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  console.log('ID cần chỉnh sửa:', id);

  // TODO: Xử lý chỉnh sửa dữ liệu theo giá trị của id

  // Điều hướng trình duyệt đến trang "/edit.html" và truyền giá trị id dưới dạng route parameter
  res.sendFile(path.join(__dirname, 'api','public','delete.html'));
});
