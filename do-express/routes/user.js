var express = require('express');
var router = express.Router();
const loginbtns = require('../controller/user');
const { SuccessModel,ErrorModel } = require('../module/resModel');

router.post('/login',function (req, res, next)  {
        const { username, password } = req.body
		console.log(1)
        const result = loginbtns( username,password )
        return result.then(data=>{
			console.log(1)
            // if(data.username){
			if(data){
                req.session.username = data.username
                req.session.realname = data.realname
                res.json(
                    new SuccessModel()
                )
                return
            }
            res.json(
                new ErrorModel('登入失败')
            )
        })
})

// router.get('/login-test',(req, res, next) => {
//     if(req.session.username){
//         res.json({
//             errno:0,
//             msg:'已登录'
//         })
//         return
//     }
//     res.json({
//         errno:-1,
//         msg:'测试失败'
//     })
// })
//

// router.get('/session-list', (req, res, next)=> {
//     const session = req.session
//     if(session.viewNum == null){
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum:session.viewNum
//     })
// });

module.exports = router;



