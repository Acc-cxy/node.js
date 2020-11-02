const fs = require('fs')
const path = require('path')



// callback 方式获取一个文件的内容
// function getFileContent(fileName,callbacks){
//     const fullFileName = path.resolve(__dirname,'files',fileName)
//     console.log(fullFileName)
//     fs.readFile(fullFileName,(err, data) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         callbacks(
//             JSON.parse(data.toString())
//         )
//     })
// }

// getFileContent('a.json',aData =>{
//     console.log('a data'+aData)
//     getFileContent('b.json',aData =>{
//         console.log('b data'+aData)
//         getFileContent('c.json',aData =>{
//             console.log('c data'+aData)
//         })
//     })
// })

// 用Promise获取内容
function getFileContent(fileName){
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname,'files',fileName)
        fs.readFile(fullFileName,(err, data) => {
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString()),
            )
        })
    })
    return promise
}

getFileContent('a.json').then(aData =>{
    console.log('a Data',aData)
    return getFileContent(aData.next)
}).then(bData =>{
    console.log('b Data',bData)
    return getFileContent(bData.next)
}).then(cData =>{
    console.log('c Data',cData)
})



