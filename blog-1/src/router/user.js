const handUserRouter = (req,res) =>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    if(method === 'POST' && req.path == '/api/blog/lists'){
        return {
            msg:'rko'
        }
    }
}

module.exports = handUserRouter
