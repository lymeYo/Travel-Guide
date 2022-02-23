// const express = require('express')
// const app = express()
// const port = 3000

// const fs = require("fs");
// const index = fs.readFileSync('../../public/index.html');

// app.get('/', (req, res) => {
//    res.send(index)
// })

// app.listen(port, () => {
//    console.log(`Example app listening at http://localhost:${port}`)
// })

'use strict';
var fs = require("fs");
var index = fs.readFileSync('./public/index.html');
var http = require('http');

http.createServer(function (req, res) {
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
   res.end(index);
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');