const querystring = require('querystring')
const handBlogRouter = require('./src/router/blog')
const handUserRouter = require('./src/router/user')

//cookie过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 *1000))
    console.log('d.toGMTString() is',d.toGMTString())
    return d.toGMTString()
}

//session 数据
const SESSION_DATA = {}

//用于处理 post data
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['Content-type'] == 'application/json'){
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
    req.query = querystring.parse(url.split('?')[1])

    //解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    // console.log('req.cookie is',req.cookie)

    //session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
            console.log('进场')
        }
    }else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    //处理postdata
    getPostData(req).then(postData =>{
        req.body = postData
        // 处理blog路由
        const blogResult = handBlogRouter(req,res)
        if(blogResult){
            blogResult.then( blogData =>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        // 处理user路由
        const userResult = handUserRouter(req,res)
        if(userResult){
            userResult.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 NOT Found\n")
        res.end()
    })
}

module.exports = severHandle



