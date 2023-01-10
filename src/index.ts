import * as dotenv from 'dotenv';
import http from 'http';
dotenv.config();

const { PORT } = process.env;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1 style='color:red'>Hello</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
