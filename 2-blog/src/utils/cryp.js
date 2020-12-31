const crypto = require('crypto')

//密匙
const SECRET_KEY = 'WJiol_8776#'

function MD5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassWord(password){
    const str = `password=${password}&key=${SECRET_KEY}`
    return MD5(str)
}

const result = genPassWord('123456')
console.log(result)

module.exports = {
    result
}
