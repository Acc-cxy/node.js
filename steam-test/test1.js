const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'data_bck.txt')

const readStream = fs.createReadStream(fileName1)
const writeSteam = fs.createWriteStream(fileName2)

readStream.pipe(writeSteam)

readStream.on('data',chunk => {
    console.log(chunk.toString())
})
readStream.on('end',()=>{
    console.log('copy end')
})
