const fs = require('fs')
const path = require('path')

//时间戳转换
function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD +" "+hh + mm + ss;
}

function writeLog(writeStream,log) {
    writeStream.write(log + '\n')
}

function createWriteStream(fileName){
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    console.log(fullFileName)
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:'a'
    })
    return writeStream
}

//写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream ,log)
}



module.exports = {
    access,formatDate
}
