const {exec} = require('../db/mysql')

const getList = (author,keyword) =>{
    // let sql = `select * from blogs`
	let sql = `select * from blogs`
    if(author){
        sql += `and author = '${author}'`
    }
    if(keyword){
        sql += `and title like '%${keyword}%'`
    }
	
    // sql += `order by createtime desc;`
    return exec(sql).then(rows =>{
        return rows[0]
    })
	
}

const getDetail = (id) => {
    const sql = `select * from blogs`
    return exec(sql).then(rows =>{
        return rows[0] 
    })
}

const newBlog = (blogData = {}) => {
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

const delBlog = ( id )=>{
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
