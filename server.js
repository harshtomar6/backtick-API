// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const homeRoute = require('./api/routes/homeRoute');
const postRoute = require('./api/routes/postRoute');
const collegeRoute = require('./api/routes/collegeRoute');
const studentRoute = require('./api/routes/studentRoute');
const departmentRoute = require('./api/routes/departmentRoute');
const classRoute = require('./api/routes/classRoute');
const rt = require('./socket');

// Load .env variables
dotenv.load();

// define PORT
const PORT = process.env.PORT || 3000;

// Connect to Database
mongoose.connect(process.env.DATABASE_URI);

// Use Logger
app.use(logger('dev'));

// Use Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use Routes
app.use('/', homeRoute);
app.use('/post', postRoute);
app.use('/college', collegeRoute);
app.use('/student', studentRoute);
app.use('/class', classRoute);
app.use('/department', departmentRoute);

//Config WebSockets;
let server = require('http').Server(app);
let io = socketio(server);

io.on('connection', (socket) => {
  rt.realTimePost(io, socket);
  rt.realTimeTest(io, socket);
})

// Listen for http requests;
server.listen(PORT, () => {
  console.log(`Server is LIVE at :${PORT}`);
});
