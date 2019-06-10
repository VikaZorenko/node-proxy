const request = require('request');
const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  const data = [];
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    try {
      proxy(data, res);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.statusMessage = "Server error";
    }
  })
}).listen(3000, () => {
  console.log("server start at port 3000");
});

function proxy(body, res) {
  const params = JSON.parse(body);
  console.log(params)
  const r = http.request(params, serverres => {
    serverres.pipe(res);
    serverres.on('end', () => res.end())
    res.statusCode = serverres.statusCode;
    res.statusMessage = serverres.statusMessage;
  });
  r.write(JSON.stringify(params.body));
  r.end();
}