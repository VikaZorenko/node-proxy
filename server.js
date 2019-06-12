const http = require('http');

// Collects request body and sends info about it

const server = http.createServer((req, res) => {
  collectRequestData(req, result => {
    res.end(`Parsed data ${JSON.stringify(result)}`);
  });
});
server.listen(4000, () => console.log("server start at port 4000"));

function collectRequestData(request, callback) {
  const data = [];
  request.on('data', chunk => {
    data.push(chunk);
  })
  request.on('end', () => {
    callback(JSON.parse(data));
  });
}