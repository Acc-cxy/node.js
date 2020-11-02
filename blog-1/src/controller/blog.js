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
module.exports = {
    getList,
    getDetail,
    newBlog
}
