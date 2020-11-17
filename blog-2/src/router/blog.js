const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../module/resModel')

//统一登录验证函数

const loginCheck = (req) =>{
    if( !req.session.username ){
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id
    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''

        if(req.query.isadmin){
            const loginCheckresult = loginCheck(req)
            if(loginCheckresult){
                return loginCheckresult
            }
            author = req.session.username
        }

        let result = getList(author,keyword)
        return result.then(listData =>{
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const result = getDetail(id)
        const loginCheckresult = loginCheck(req)
        if(loginCheckresult){
            return loginCheckresult
        }
        return result.then( data =>{
            return new SuccessModel(data)
        })
    }
    // 新增一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        const loginCheckresult = loginCheck(req)
        if(loginCheckresult){
            return loginCheckresult
        }

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then(data =>{
			return new SuccessModel(data)
		})
    }
    // 更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id,req.body)
		return result.then(val=>{
			if(val>0){
			    return new SuccessModel()
			}else {
			    return new ErrorModel('No!!!')
			}
		})
    }
    // 删除一篇博客
    if(method === 'POST' && req.path === '/api/blog/del'){
        const author = req.session.username
        const result = delBlog(id,author)
		return result.then(val=>{
			if(val>0){
			    return new SuccessModel()
			}else {
			    return new ErrorModel('No!!!')
			}
		})
    }
}

module.exports = handBlogRouter
