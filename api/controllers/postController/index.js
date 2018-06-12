// Dependencies
const mongoose = require('mongoose');
const { Post, Department, Student, 
  College, TestPost, Staff } = require('./../../models');
const { ObjectId } = require('mongodb');
const moid = mongoose.Types.ObjectId;

// Find all posts
const getAllPosts = callback => {
  Post.find({})
    .sort({timestamp:-1})
    .populate({path: 'likes', select: 'name photoURL'})
    .populate({path: 'owner', select: 'name photoURL _id'})
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
    .populate({path: 'owner', select: 'name photoURL _id'})
    .exec((err, posts) => {
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
let addPost = (data, owner, callback) => {
  if(data.postedBy === 'Student')
    Student.findOne({_id: owner})
      .select('class college department classJoined')
      .exec((err, student) => {
        if(err)
          return callback(err, 500, null);
        else if(!student)
          return callback('No Student Found', 400, null);
        else{
          if(!student.classJoined)
          return callback('Join A Class first', 400, null);
        
          let post = new Post(data);
          post.owner = owner;
          post.class = student.class;
          post.college = student.college;
          post.department = student.department;

          post.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          });
        }  
      });
  else if(data.postedBy === 'Staff')
    Staff.findOne({_id: owner})
      .select('college department classJoined')
      .exec((err, staff) => {
        if(err)
          return callback(err, 500, null);
        else if(!staff)
          return callback('No Staff Found', 400, null);
        else{
          if(!staff.classJoined)
            return callback('Join A Class First', 400, null);
          
          let post = new Post(data);
          post.owner = owner;
          post.department = staff.department;
          post.college = staff.college;

          post.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
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

// Save A Post
const savePost = (postId, ownerId, callback) => {
  if(!ObjectId.isValid(postId) || !ObjectId.isValid(ownerId))
    return callback('Invalid Post Id or Owner Id', 400, null);
  
  Post.findOne({_id: postId},'savedPosts', (err, post) => {
    if(err)
      return callback(err, 500, null);
    else if(!post)
      return callback('No Post Found', 400, null);
    else{
      Student.findOne({_id: ownerId}, (err, student) => {
        if(err)
          return callback(err, 500, null);
        else if(!student)
          return callback('No Student Found', 400, null);
        else{
          let savedPosts = [];
          for(let i=0;i<student.savedPosts.length;i++)
            savedPosts.push(student.savedPosts[i].toString());
          if(savedPosts.includes(postId))
            student.savedPosts.splice(savedPosts.indexOf(postId), 1);
          else
            student.savedPosts.push(new moid(postId));
          
          student.save((err, saved) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, saved);
          })
        }
      });
    }
  })
}

// Get All post of a particular owner
let getOwnerPosts = (id, callback) => {
  Post.find({owner: id}, (err, posts) => {
    return callback(err, posts);
  })
}

// Get All posts of a class
let getClassPosts = (id, callback) => {
  Post.find({class: id}, (err, posts) => {
    return callback(err, posts);
  });
}

// Get All posts of a department
let getDepartmentPosts = (id, callback) => {
  Post.find({department: id}, (err, posts) => {
    return callback(err, posts);
  });
}

// Get All posts of a College
let getCollegePosts = (id, callback) => {
  Post.find({college: id}, (err, posts) => {
    return callback(err, posts);
  });
}

// Like Post
let likePost = (id, ownerid, callback) => {
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
let commentOnPost = (id, commentData, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Post Id', 400, null);

  Post.findOne({_id: id}, 'comments', (err, post) => {
    if(err)
      return callback(err, null);
    else if(post == null)
      return callback('No Post Found', 400, null);
    else{
      let comment = new Comment(commentData);
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


// Test Post functions
async function getTestPosts(req, res, next){
  let posts;
  try{
    posts = await TestPost.find({}).exec();
    res.status(200).send({err: null, data: posts});
  }catch(err){
    console.log(err);
    res.status(500).send({err: err, data: null});
  }
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
  getPostsByPage,
  addPost,
  modifyPost,
  deletePost,
  getTestPosts,
  addTestPost,
  likeTestPost,
  getOwnerPosts,
  getClassPosts,
  getDepartmentPosts,
  getCollegePosts,
  likePost,
  commentOnPost,
  savePost
}