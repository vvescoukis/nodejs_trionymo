let http = require('http');
let url = require('url');


// --- my code ---
function strDateNow() {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + "  " + time;
}

function consoleWrite(msg) {
    console.log(strDateNow() + ": " + msg);
}

function mySolveT(t) {
    let D = t.B * t.B - 4 * t.A * t.C;
    t.solvableR = (D >= 0);
    if (t.solvableR) {
        let sqD = Math.sqrt(D);
        t.root1 = ((-1) * t.B + sqD) / (2 * t.A);
        t.root2 = ((-1) * t.B - sqD) / (2 * t.A);
    }
    else {
        consoleWrite(" not solvable in R " );
    }
}

function doTheJob (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    let q = url.parse(req.url, true).query;
    let urlmsg = "url: " + req.url + "<br><br>";

    let txt;
    let myTrionymo = {  A: 0, B: 0, C: 0,
                        solvableR: true,
                        root1: 0, root2: 0 };

    try {
        myTrionymo.A = parseFloat(q.a);
        myTrionymo.B = parseFloat(q.b);
        myTrionymo.C = parseFloat(q.c);
        if (isNaN(myTrionymo.A)) throw "a not present";
        if (isNaN(myTrionymo.B)) throw "b not present";
        if (isNaN(myTrionymo.C)) throw "c not present";
    }
    catch(err) {
        consoleWrite(err);
        myTrionymo.solvableR = false;
    }

    if (myTrionymo.solvableR) {
        mySolveT(myTrionymo);
    }

    if (myTrionymo.solvableR) {
        txt = "solved: a=" + myTrionymo.A + " b=" + myTrionymo.B + " c=" + myTrionymo.C + "  ("
            + myTrionymo.solvableR + ")  r1=" + myTrionymo.root1 + ", r2=" + myTrionymo.root2;
    }
    else {
        txt = "not solvable";

    }

    consoleWrite("\n reloaded page " + urlmsg+"\n " + txt + "\n");

    // --- "frontend" ---
    // res.write("Welcome to my trionymo<br>The time is " + strDateNow() + "<br><br>");
    // res.write(urlmsg);
    // res.end("<br>Trionymo: " + txt + "<br><br>");

    // ---web service---
    res.end(JSON.stringify(myTrionymo));

}

http.createServer(doTheJob).listen(8080);


//--- typical js ---
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     let q = url.parse(req.url, true).query;
//     let txt = q.year + " " + q.month;
//     res.write(req.url + "<br>");
//     res.write("<br>" + txt+ "<br><br>");
//     console.log("ugly refresh " + txt)
//     res.end('Hello ugly World!<br>I did it!!!');
// }).listen(8081);
