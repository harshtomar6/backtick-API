// Dependencies
const mongoose = require('mongoose');
const { Post, User, Comment } = require('./../models');
const { ObjectId } = require('mongodb');
const moid = mongoose.Types.ObjectId;

// Find all posts
const getAllPosts = callback => {
  Post.find({})
    .sort({timestamp:-1})
    .populate({path: 'likes', select: 'name photoURL'})
    .populate({path: 'owner', select: 'name photoURL _id'})
    .populate({
      path: 'comments', 
      populate: {path: 'owner', select: 'name photoURL _id'}
    })
    .exec((err, posts) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, posts);
    })
}

// Get Posts By Page Number
const getPostsByPage = (pageNumber, perPage, callback) => {
  Post.find({})
    .sort({timestamp: -1})
    .skip((pageNumber-1) * perPage)
    .limit(perPage)
    .populate({path: 'likes', select: 'name photoURL'})
    .populate({path: 'owner', select: 'name photoURL _id'})
    .populate({
      path: 'comments', 
      populate: {path: 'owner', select: 'name photoURL _id'}
    })
    .exec((err, posts) => {
      return callback(err, posts);
    })
}

// Get a particular post
const getPostById = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback("Invalid Post Id", 400, null);

  Post.findOne({_id: id})
    .populate({path: 'likes', select: 'name photoURL'})
    .populate({path: 'owner', select: 'name photoURL _id'})
    .populate({
      path: 'comments', 
      populate: {path: 'owner', select: 'name photoURL _id'}
    })
    .exec((err, post) => {
      if(err)
        return callback(err, 500, null);
      else  
        return callback(null, 200, post);
    });
}

// Add a new post
const addPost = (data, owner, callback) => {
  User.findOne({_id: owner}, (err, user) => {
    if(err)
      return callback(err, 500, null);
    else if(!user)
      return callback("No User Found !", 400, null);
    else{
      let post = new Post(data);
      post.owner = owner;
      let contains = true;
      for(let i=0;i<data.groups.length;i++){
        if(user.groups.indexOf(data.groups[i]) === -1){
          contains = false;
          break;
        }
      }

      if(!contains)
        return callback('Invalid Group for user', 400, null);
      else
        post.save((err, post) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, post);
        });
    }
  });
}

// Edit existing Post
let modifyPost = (id, ownerId, data, callback) => {
  if(!ObjectId.isValid(id) || !ObjectId.isValid(ownerId))
    return callback('Invalid Post Id or Owner Id', 400, null);
  
  Post.findOne({_id: id, owner: ownerId}, (err, post) => {
    if(err)
      return callback(err, 500, null);
    else if(!post)
      return callback('No Post Found', 404, null);
    else{
      Post.update({_id: id, owner: ownerId}, data, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
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

// Like Post
const likePost = (id, ownerid, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Post Id', 400, null);

  Post.findOne({_id: id}, 'likes', (err, post) => {
    if(err)
      return callback(err, 500, null);
    else if(post == null)
      return callback('No Post Found', 404, null);
    else{
      let likes = [];
      for(let i=0;i<post.likes.length;i++)
        likes.push(post.likes[i].toString());
      if(likes.includes(ownerid))
        post.likes.splice(likes.indexOf(ownerid), 1);
      else
        post.likes.push(new moid(ownerid));
      
      post.save((err, saved) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, saved);
      })
    }
  });
}

// Comment on A Post
let commentOnPost = (id, commentData, owner, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Post Id', 400, null);

  Post.findOne({_id: id}, 'comments', (err, post) => {
    if(err)
      return callback(err, null);
    else if(post == null)
      return callback('No Post Found', 400, null);
    else{
      let comment = new Comment(commentData);
      comment.owner = owner;
      comment.save((err, success) => {
        if(err)
          return callback('Cannot Add Comment', 500, null);
        else{
          post.comments.push(success._id);
          post.save((err, done) => {
            if(err)
              return callback('Error in adding Comment', 500, null);
            else{
              //Return comment;  
              return callback(null, 200, success);    
            }
          })
        }
      });
    }
  });
}

module.exports = {
  getAllPosts,
  getPostsByPage,
  getPostById,
  addPost,
  modifyPost,
  deletePost,
  likePost,
  commentOnPost
}