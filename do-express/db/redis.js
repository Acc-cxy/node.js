const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClinent = redis.createClient(REDIS_CONF.prot,REDIS_CONF.host)
redisClinent.on('error',err=>{
    console.error(err)
})

function set(key,val) {
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClinent.set(key,val,redis.print)
}

function get(key){
    const promise = new Promise((resolve, reject) => {
        redisClinent.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val == null){
                resolve(null)
                return
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex){
                resolve(val)
            }
        })

    })
    return promise
}

module.exports = {
    set,
    get
}
