const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '8.131.236.131',
    user: 'db_myblog',
	port:'3306',
    password:'db_myblog',    // 改成你自己的密码
    database:'myblog'    // 改成你的数据库名称
});

connection.connect();

// 下面是解决跨域请求问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

// 这里就是主要要修改的地方，其实也就一行
// 把 address 改成你自己定的地址，就是连接访问的那个地址
app.get('/api/blog/list',function(err,res){
    const sql = 'select * from blogs'; // 写你需要的sql代码，你要是不会写那我就真的没办法了
    connection.query(sql,function(err,result){
            if(err){
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // result内放的就是返回的数据，res是api传数据
            // 返回的数据需要转换成JSON格式
            res.json(result); 
        }); 
})    

var server = app.listen(8085, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("地址为 http://%s:%s", host, port);
})