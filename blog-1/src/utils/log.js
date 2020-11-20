const fs = require('fs')
const path = require('path')

function createWriteStream(fileName){
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:'a'
    })
    return createWriteStream()
}

const accessWriteStream = createWriteStream('access.log')

function access(log) {
    
}
