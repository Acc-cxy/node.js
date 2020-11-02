const querystring = require('querystring')
const handBlogRouter = require('./src/router/blog')
const handUserRouter = require('./src/router/user')
const severHandle = (req,res) => {
    res.setHeader('Content-type','application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析 query
    req.query = querystring.parse(url.split('?')[0])

    // 处理blog路由
    const blogData = handBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        console.log(9)
        return false
    }
    console.log(1)
    // 处理user路由
    const userData = handUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return false
    }
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 NOT Found\n")
    res.end()
}

module.exports = severHandle



