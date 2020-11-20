const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname,'data.txt')

// fs.readFile(fileName,((err, data) => {
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// }))

const content = '拍一拍你\n'
const opt = {
    flag:'a' //覆盖用w
}
fs.writeFile(fileName,content,opt,(err) => {
    if(err){
        console.error(err)
        return
    }
    console.log('载入成功')
})
