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
const globalErrorHandler = require('./controller/errorController');

app.use(morgan('dev'))
const userRouter = require('./routes/routes')
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/api/v1/user', userRouter);
app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.removeHeader('x-powered-by');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods', '*');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //allow request to continue and be handled by routes
    next();
});
app.use(globalErrorHandler);
module.exports = app