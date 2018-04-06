// Dependencies
let mongoose = require('mongoose');
let schema = require('./../models/schema');

// Models
let Post = mongoose.model('Post', schema.postSchema);
let TestPost = mongoose.model('TestPost', schema.testPost);

// Find all posts
let getAllPosts = (callback) => {
  Post.find({}, (err, posts) => {
    return callback(err, posts);
  })
}

// Get a particulat post
let getPostById = (id, callback) => {
  Post.findOne({_id: id}, (err, post) => {
    if(post == null)
      return callback('No Post Found', null);
    else
      return callback(err, post);
  });
}

// Add new Post
let addPost = (data, callback) => {
  let post = new Post(data);

  post.save((err, success) => {
    return callback(err, success);
  })
}

// Edit existing Post
let modifyPost = (id, data, callback) => {

}

// Delete Post
let deletePost = (id, callback) => {
  Post.findOne({_id: id}, (err, post) => {
    if(err)
      return callback(err, null);
    else if(post == null)
      return callback('No Post Found', null);
    else{
      Post.remove({_id: id}, (err, success) => {
        return callback(err, post);
      })
    }
  });
}

// Test Post functions
let getTestPosts = (callback) => {
  TestPost.find({}, (err, success) => callback(err, success));
}

let addTestPost = (data, callback ) => {
  let testPost = new TestPost(data);
  testPost.save((err, success) => callback(err, success));
}

let likeTestPost = (id, callback) => {
  TestPost.findOne({_id: id}, '_id likes', (err, post) => {
    if(err)
      return callback(err, null);
    else if(post == null)
      return callback('No Post found', null);
    else{
      TestPost.update({_id: id}, {$inc: {likes: 1}}, (err, success) => {
        post._doc.likes += 1; 
        return callback(err, post._doc);
      });
    }
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  modifyPost,
  deletePost,
  getTestPosts,
  addTestPost,
  likeTestPost
}