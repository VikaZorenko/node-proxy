const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.method);
  collectRequestData(req, result => {
    console.log(result);
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
    console.log(data)
    callback(JSON.parse(data));
  });
}