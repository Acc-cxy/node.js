const loginCheck = ( username,password ) => {
    if( username === "zhangsan" && password === "zhangsan"){
        console.log('登入成功')
        return true
    }
    console.log('登入失败')
    return false
}

module.exports = {
    loginCheck
}
