// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))
const userRouter = require('./routes/routes')
app.use(express.json());
app.use('/api/v1/user',userRouter)
module.exports = app