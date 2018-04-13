// Dependencies
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let logger = require('morgan');
let socketio = require('socket.io');
let homeRoute = require('./api/routes/homeRoute');
let postRoute = require('./api/routes/postRoute');
let postController = require('./api/controllers/postController');
let collegeRoute = require('./api/routes/collegeRoute');
let studentRoute = require('./api/routes/studentRoute');
let config = require('./config');

// define PORT
const PORT = process.env.PORT || 3000;

// Connect to Database
mongoose.connect(config.DATABASE_URI);

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
