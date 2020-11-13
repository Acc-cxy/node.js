const http = require('http');
const querystring = require('querystring')
const hostname = '127.0.0.1'
const port = 8000
const server = http.createServer((req,res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    res.setHeader('Content-type', 'application/json')

    const resData = {
        method,
        url,
        path,
        query
    }

    //返回
    if (method === 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }
    if (method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

console.log(process)
