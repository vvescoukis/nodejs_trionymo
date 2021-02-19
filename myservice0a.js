http = require('http');
url = require('url');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h2>normal triangle </h2> b= " +
        url.parse(req.url, true).query.b +
        ", c= " + url.parse(req.url, true).query.c +
        ":  a=" + Math.sqrt(Math.pow(url.parse(req.url, true).query.b,2) +
            Math.pow(url.parse(req.url, true).query.c,2)));
}).listen(8081);
