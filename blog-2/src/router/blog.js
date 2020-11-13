const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../module/resModel')
const handBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id
    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData =>{
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const result = getDetail(id)
        return result.then( data =>{
            return new SuccessModel(data)
        })
    }
    // 新增一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    // 更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id,req.body)
        // console.log(updata)
        if(result){
            return new SuccessModel()
        }else {
            return new ErrorModel('No!!!')
        }
    }
    // 删除一篇博客
    if(method === 'POST' && req.path === '/api/blog/del'){
        const result = delBlog(id)
        if(result){
            return new SuccessModel
        }else {
            return new ErrorModel('删除失败')
        }
    }
}

module.exports = handBlogRouter
