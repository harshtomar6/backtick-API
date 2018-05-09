// Dependencies
const controller = require('./api/controllers');

// Real Time Post functions
let clients = [];
const realTimePost = (io, socket) => {
  console.log('A Client Connected');
  clients.push(socket.id);
  console.log(clients);

  socket.on('/post/like', data => {
    controller.likePost(data.postId, data.ownerId, (err, success) => {
      if(err)
        io.emit('err', err);
      else
        io.emit('liked', success);
    })
  });
} 

// Test Post function
let testClients = [];
const realTimeTest = (io, socket) => {
  console.log('Test Client Connected');
  testClients.push(socket.id);
  console.log(testClients);
  
  socket.on('add-post', (data) => {
    controller.addTestPost(data, (err, success) => {
      if(success){
        io.emit('new-post', success);
      }
    })
  });

  socket.on('like-post', (id) => {
    controller.likeTestPost(id, (err, success) => {
      if(success){
        io.emit('post-liked', success);
      }
    });
  })
}

module.exports = {
  realTimePost,
  realTimeTest
};