const mysql = require('mysql')
// const {MYSQL_CONF} = require('../conf/conf')
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'myblog'
})

// const con = mysql.createConnection({MYSQL_CONF})

con.connect()

function exec(sql){
    const promise = new Promise((resolve, reject) => {
        con.query(sql,(err,result) =>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

// con.end() //关闭连接

module.exports = {
    exec,
    escape:mysql.escape
}
