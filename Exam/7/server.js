const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const type = file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html';

  fs.readFile('public/' + file, (err, data) => {
    res.writeHead(err ? 404 : 200, { 'Content-Type': type + '; charset=utf-8' });
    res.end(err ? '404' : data);
  });
}).listen(3000, () => console.log('http://localhost:3000'));