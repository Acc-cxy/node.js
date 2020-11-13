var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail
} = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../module/resModel')
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    const result = getList(author,keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

router.get('/del', function(req, res, next) {
    res.json({
        errno:0,
        data:ok
    })
});
module.exports = router;
