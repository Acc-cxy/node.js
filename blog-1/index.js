const querystring = require('querystring')
const handBlogRouter = require('./src/router/blog')
const handUserRouter = require('./src/router/user')

//用于处理 post data
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['Content-Type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunks=>{
            postData += chunks.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const severHandle = (req,res) => {
    res.setHeader('Content-type','application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析 query
    req.query = querystring.parse(url.split('?')[0])

    getPostData(req).then(postData =>{
        req.body = postData
        // 处理blog路由
        const blogData = handBlogRouter(req,res)
        if(blogData){
            res.end(
                JSON.stringify(blogData)
            )
            console.log(9)
            return false
        }
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
    })
}

module.exports = severHandle



