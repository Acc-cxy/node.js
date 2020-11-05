const { loginCheck } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../module/resModel')

const handUserRouter = (req,res) =>{
    const method = req.method

    if(method === 'POST' && req.path == '/api/user/login'){
        const { username, password } = req.body
        const result = loginCheck( username,password )
        if( 1 == 1){
            return new SuccessModel('登入成功')
        }
        return new ErrorModel('登入失败ss')
    }
}


module.exports = handUserRouter
