const {loginCheck} = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../module/resModel')

const handUserRouter = (req,res) =>{
    const method = req.method

    if(method === 'POST' && req.path == '/api/blog/lists'){
        const { username, password } = req.body
        const result = loginCheck(username,password)
        if(result){
            return new SuccessModel('登入成功')
        }
        return new ErrorModel('登入失败')
    }
}


module.exports = handUserRouter
