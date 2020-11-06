const mysql = require('mysql')

//创建对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'myblog'
})

con.connect()

const sql = 'select * from blogs;'
con.query(sql,(err,result) =>{
    if(err){
        console.log(err)
        return
    }
    console.log(result)
})

con.end()
