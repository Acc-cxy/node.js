const http = require('http')
const server = http.createServer((req, res) => {

    if(req.url === '/err'){
        throw new Error('/err 凉了')
    }

    console.log('left')
    console.error('right')

    res.setHeader('Content-type','application/json')
    res.end(JSON.stringify({
        erron : 0,
        msg : '你好全世界 +++'
    }))
})

server.listen(1234)
