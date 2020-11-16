const redis = require('redis')

const redisClinent = redis.createClient(6379,'127.0.0.1')
redisClinent.on('error',err=>{
    console.error(err)
})

redisClinent.set('myname','linqinggan',redis.print)
redisClinent.get('myname',(err,val)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('val',val)

    //退出
    redisClinent.quit()
})
