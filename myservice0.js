let http = require('http');
let url = require('url');
function hypotenuse(b, c) {
    return Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2))
}
function myServer(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let q = url.parse(req.url, true).query;
    let b = q.b;
    let c = q.c;
    let a = hypotenuse(b, c);
    res.end("<h2>normal triangle </h2> b= " + b + ", c= " + c + ":  a=" + a);
}
http.createServer(myServer).listen(8081);
