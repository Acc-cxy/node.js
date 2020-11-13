const http = require('http')
const hostname = '127.0.0.1';
const PORT = 8000
const severHandle = require('../index')
const server = http.createServer(severHandle)

server.listen(PORT,hostname,()=>{
    console.log(`Server running at http://${hostname}:${PORT}/`);
})
