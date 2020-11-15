const mysql = require('mysql')
// const {MYSQL_CONF} = require('../conf/db')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'mysql'
})

con.connect()

function exec(sql){
    return  new Promise((resolve, reject) => {
        con.query(sql,(err,result) =>{
            if(err){
                reject(err)
                return
            }
            console.log(result)
        })
    })
}

// con.end() //关闭连接

module.exports = {
    exec
}
