const loginChenck = ( username,password ) => {
    if( username === 'zhangsan' && password === '123'){
        console.log('登入成功')
        return true
    }
    return false
}

module.exports = loginChenck()
