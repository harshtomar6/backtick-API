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
const postController = require('./api/controllers/postController');
const collegeRoute = require('./api/routes/collegeRoute');
const studentRoute = require('./api/routes/studentRoute');
const departmentRoute = require('./api/routes/departmentRoute');
const classRoute = require('./api/routes/classRoute');

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

let clients = [];

io.on('connection', (socket) => {
  console.log('A Client Connected');
  clients.push(socket.id);
  console.log(clients);
  
  socket.on('add-post', (data) => {
    postController.addTestPost(data, (err, success) => {
      if(success){
        io.emit('new-post', success);
      }
    })
  });

  socket.on('like-post', (id) => {
    postController.likeTestPost(id, (err, success) => {
      if(success){
        io.emit('post-liked', success);
      }
    });
  })
})

// Listen for http requests;
server.listen(PORT, () => {
  console.log(`Server is LIVE at :${PORT}`);
});
