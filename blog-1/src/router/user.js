const { loginCheck } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../module/resModel')

const handUserRouter = (req,res) =>{
    const method = req.method

    if(method === 'POST' && req.path == '/api/user/login'){
        const { username, password } = req.body
        const result = loginCheck( username,password )
		return result.then(rows=>{
			
		})
    }
}


module.exports = handUserRouter
