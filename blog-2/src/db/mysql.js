const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql){
    return  new Promise((resolve, reject) => {
        con.query(sql,(err,result) =>{
            if(err){
                reject(err)
                return
            }
            console.log(result)
			// return result
			// resolve.json(result); 
			resolve(result)
        })
    })
}

// con.end() //关闭连接

module.exports = {
    exec
}
