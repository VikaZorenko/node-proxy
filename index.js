const request = require('request');
const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  const data = [];
  req.on('data', chunk => {
    data.push(chunk); // accumulate data
  })
  req.on('end', () => {
    try {
      proxy(data, res);
    } catch (e) {
      res.statusCode = 500;
      res.statusMessage = "Server error";
    }
  })
}).listen(3000, () => {
  console.log("server start at port 3000");
});

function proxy(body, res) {
  const params = JSON.parse(body);

  const r = http.request(params, serverres => {
    serverres.pipe(res); // pipe server response to client
    serverres.on('end', () => res.end()); // end when server ends
    res.statusCode = serverres.statusCode; // and also send true status code and message
    res.statusMessage = serverres.statusMessage;
  });

  r.write(JSON.stringify(params.body)); // send client's query body to server
  r.end();
}