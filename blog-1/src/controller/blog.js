const getList = (anthor,keyword) =>{
    return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:13544131541,
            author:'Acc'
        },
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:13544131541,
            author:'lisi'
        }
    ]
}

const getDetail = (id) =>{
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:13544131999,
        author:'xuexue'
    }
}

const newBlog = (blogData = {}) =>{
    console.log('newBlog blogData..,',newBlog)
    return{
        id:3
    }
}

const updateBlog = ( id, blogData = {}) =>{
    // id 要更新的博客
    console.log('updata...',id,blogData)
    return true
}

const delBlog = ( id)=>{
    console.log('已删除')
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
