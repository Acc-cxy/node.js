const { loginbtns } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../module/resModel')


const handUserRouter = (req,res) =>{
    const method = req.method

    if(method === 'POST' && req.path == '/api/user/login'){
        const { username, password } = req.body
        const result = loginbtns( username,password )
        return result.then(data=>{
            if(data.username){
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session',req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登入失败')
        })
    }

    //登入验证
    // if(method === 'GET' && req.path == '/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session:req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登录')
    //     )
    // }
}


module.exports = handUserRouter
