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
const cors = require("cors"); //Add this


app.use(morgan('dev'))
const userRouter = require('./routes/routes')
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/api/v1/user', userRouter);
app.use((res, req, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');

    next();
});
app.use(cors()); //And add this line as well
app.use(globalErrorHandler);
module.exports = app