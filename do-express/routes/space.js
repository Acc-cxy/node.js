var express = require('express');
var router = express.Router();
const {getSpace,newSpace,uploadPhoto} = require('../controller/space')
const { SuccessModel,ErrorModel} = require('../module/resModel')
const loginCheck = require('../middleware/loginCheck')
const uploadModel = require('../controller/spaceto')

router.get('/list',(req, res, next) => {
    const result = getSpace()
    return result.then(listData=>{
        res.json(new SuccessModel(listData))
    })
})

router.post('/new',(req, res, next) => {
    req.body.author = req.session.username
    const result = newSpace(req.body)
    return result.then(data=>{
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/imgUpload',(req,res,next) =>{
    // console.log(uploadPath)
    uploadModel.uploadPhoto(req,'img',(err,fields,uploadPath)=> {
        if(err){
            return res.json({
                errCode:0,
                errMsg:'上传图片错误'
            })
        }
        const body = {
            fields,uploadPath
        }
        console.log(body);    //表单中字段信息
        console.log(uploadPath);    //上传图片的相对路径
        const result = newSpace(body)
        return result.then(data=>{
            res.json({
                errCode : 1,
                errMsg : '上传成功',
                fields :  fields,
                uploadPath : uploadPath
            });
        })

    })
})


module.exports = router;
