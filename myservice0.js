
// --- typical js ---

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let q = url.parse(req.url, true).query;
    let b = q.b;
    let c = q.c;
    let a = Math.sqrt(Math.pow(b,2) + Math.pow(c,2))
    res.write(req.url + "<br>");
    res.end("<br> normal triangle with b= " + b + ", c= " + c + ":  a=" + a +"<br><br>");
}).listen(8081);
