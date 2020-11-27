const http=require('http');
const fs=require("fs");
const url=require("url");
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    let _url=url.parse(req.url);
    let pathname=_url.pathname;
    if(pathname==='/' || pathname==='/index.html'){
        console.log("首页");
    }else if(pathname==='/login'){
        console.log("登录页");
    }else{
        console.log("404");
    }
    res.end('hello');
})
server.listen(9000);

Promise((res,req))
