const { ErrorModel } = require('../module/resModel');

module.exports = (req,res,next) => {
    if(req.session.username){
        next()
        return
    }
    res.json(
        new ErrorModel('未登入')
    )
}
