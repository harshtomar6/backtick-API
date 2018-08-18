// Dependencies
const controller = require('./apiv2/controllers');

// Real Time Post functions
let clients = [];
const realTimePost = (io, socket) => {
  console.log('A Client Connected');
  clients.push(socket.id);
  console.log(clients);

  // Like Post
  socket.on('/post/like', data => {
    
    controller.likePost(data.postId, data.user._id, (err, success) => {
      if(err)
        socket.emit('like-err', err);
      else
        socket.emit('like-success', success);
    })
  });

  // Save Post
  socket.on('/post/save', data => {
    controller.savePost(data.postId, data.userId, (err, success) => {
      if(err)
        io.emit('save-err', err);
      else
        io.emit('save-success', succcess);
    });
  });

  // Comment on Post
  socket.on('/post/comment', data => {
    controller.commentOnPost(data.postId, data.comment, data.userId, (err, status, success) => {
      if(err)
        io.emit('comment-err', err);
      else
        io.emit('comment-success', data);
    });
  })
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