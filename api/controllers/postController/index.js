// Dependencies
const mongoose = require('mongoose');
const schema = require('./../../models/schema');
const {ObjectId} = require('mongodb');

// Models
let Post = mongoose.model('Post', schema.postSchema);
let TestPost = mongoose.model('TestPost', schema.testPost);
let Comment = mongoose.model('Comment', schema.commentSchema);
let Student = mongoose.model('Student', schema.studentSchema);

// Find all posts
let getAllPosts = (callback) => {
  Post.find({}, (err, posts) => {
    if(err)
      return callback(err, 500, null);
    else if(posts.length === 0)
      return callback(null, 200, posts);
    else{
      let i=0,data=[]
      posts.forEach(post => {
        Student.findOne({_id: post.ownerId}, 'name photoURL', (err, student) => {
          i++;
          if(err)
            return callback(err, 500, null);
          else if(!student)
            return callback('No Student Found', 404,null);
          else{
            data.push({
              text: post.text,
              comments: post.comments,
              likes: post.likes,
              attachment: post.attachment,
              level: post.level,
              timestamp: post.timestamp,
              postedBy: post.postedBy,
              classId: post.classId,
              departmentId: post.departmentId,
              collegeId: post.departmentId,
              owner: {
                id: student._id,
                name: student.name,
                photoURL: student.photoURL
              }
            });

            if(i === posts.length)
              return callback(null, 200, data);
          }
        })
      });
    }
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

  Student.findOne({_id: owner})
    .select('classId collegeId departmentId')
    .exec((err, student) => {
      if(err)
        return callback(err, 500, null);
      else if(!student)
        return callback('No Student Found', 404, null);
      else{
        if(student.collegeId === 'not joined' || student.departmentId === 'not joined' || student.classId === 'not joined')
        return callback('Join College, Department and Class first', 400, null);
      
        let post = new Post(data);
        post.ownerId = owner;
        post.classId = student.classId;
        post.collegeId = student.collegeId;
        post.departmentId = student.departmentId;

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
  
  Post.findOne({_id: id, ownerId: ownerId}, (err, post) => {
    if(err)
      return callback(err, 500, null);
    else if(!post)
      return callback('No Post Found', 404, null);
    else{
      Post.update({_id: id, ownerId: ownerId}, data, (err, success) => {
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

// Get All post of a particular owner
let getOwnerPosts = (id, callback) => {
  Post.find({ownerId: id}, (err, posts) => {
    return callback(err, posts);
  })
}

// Get All posts of a class
let getClassPosts = (id, callback) => {
  Post.find({classId: id}, (err, posts) => {
    return callback(err, posts);
  });
}

// Get All posts of a department
let getDepartmentPosts = (id, callback) => {
  Post.find({departmentId: id}, (err, posts) => {
    return callback(err, posts);
  });
}

// Get All posts of a College
let getCollegePosts = (id, callback) => {
  Post.find({collegeId: id}, (err, posts) => {
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
      if(post.likes.length === 0){
        post.likes.push(ownerid);
        post.save((err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, success);
        })  
      }
      else{
        let i=0;
        post.likes.forEach(element => {
          i++;
          if(element == ownerid){
            post.likes.splice(post.likes.indexOf(ownerid), 1);
            post.save((err, success) => {
              if(err)
                return callback(err, 500, null);
              else
                return callback(null, 200, success);
            })    
          }

          if(i == post.likes.length){
            post.likes.push(ownerid);
            post.save((err, success) => {
              if(err)
                return callback(err, 500, null);
              else
                return callback(null, 200, success);
            })
          }
        });
      }
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
  likeTestPost,
  getOwnerPosts,
  getClassPosts,
  getDepartmentPosts,
  getCollegePosts,
  likePost,
  commentOnPost
}