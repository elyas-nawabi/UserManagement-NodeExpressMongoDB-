var http = require('http');
var myServer = http.createServer( function(req, res){
    if (req.url == '/') {
        res.write("<h1>This is homepage</h1>");
        res.end();
    }
    else
    res.end("invalid request")
})
myServer.listen(8999)
console.log("Server is running in port: 8999")
module.exports = http;