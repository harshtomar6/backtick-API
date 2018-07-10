// Dependencies
const { ObjectId } = require('mongodb');
const { Group, User, Post } = require('./../models');

// Get All Colleges
const getAllColleges = (callback) => {
  Group.find({type: 'College'}, (err, colleges) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, colleges);
  });
}

// Add New College
const addCollege = (data, callback) => {
  let college = new Group(data);
  college.parent = [];
  college.type = 'College';

  college.save((err, success) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, success);
  });
}

// Get A Particular College
const getCollege = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid College Id', 400, null);
  
  Group.findOne({_id: collegeId}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if(!college)
      return callback('No College Found', 400, null);
    else{
      return callback(null, 200, college);
    }
  });
}

// Get Departments of a college
const getCollegeDepartments = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid College Id', 400, null);

  Group.find({parent: collegeId, type: 'Department'})
    .populate('parent')
    .exec((err, departments) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, departments);
    });
}

// Add Department to a college
const addDepartment = (collegeId, data, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback("Invalid College Id", 400, null);

  Group.findOne({_id: collegeId, type: 'College'}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if(!college)
      return callback('No College Found !', 400, null);
    else{
      let department = new Group(data);
      department.type = "Department";
      department.parent.push(collegeId);

      department.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Get a particular Department
const getDepartment = (departmentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Department ID', 400, null);

  Group.findOne({_id: departmentId, type: 'Department'})
  .populate('parent')  
  .exec((err, department) => {
    if(err)
      return callback(err, 500, null);
    else if(!department)
      return callback('No Department Found !', 400, null);
    else
      return callback(null, 200, department); 
  });
}

// Get Classes of a College
const getCollegeClass = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid College Id', 400, null);

  Group.find({parent: collegeId, type: 'Class'})
    .populate('parent')
    .exec((err, classes) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, classes);
    });
}

// Get Classes of a Department
const getDepartmentClass = (departmentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Department Id', 400, null);

  Group.find({parent: departmentId, type: 'Class'})
    .populate('parent')
    .exec((err, classes) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, classes);
    });
}

// Add Class to a Department
const addClass = (departmentId, data, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback("Invalid Department Id", 400, null);

  Group.findOne({_id: departmentId, type: 'Department'}, (err, department) => {
    if(err)
      return callback(err, 500, null);
    else if(!department)
      return callback('No Department Found !', 400, null);
    else{
      let class_ = new Group(data);
      class_.type = "Class";
      class_.parent.push(departmentId);
      class_.parent.push(department.parent[0]);

      class_.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 201, success);
      });
    }
  });
}

// Get Students of a particular college
const getGroupStudents = (groupId, callback) => {
  if(!ObjectId.isValid(groupId))
    return callback('Invalid College Id', 400, null);

  Group.findOne({_id: groupId}, (err, group) => {
    if(err)
      return callback(err, 500, null);
    else if(!group)
      return callback('No College Found !', 400, null);
    else{
      User.find({type: 'Student', groups: groupId})
        .populate('groups')
        .populate('savedPosts')
        .exec((err, students) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, students);
        });
    }
  });
}

// Join a Group
const joinGroup = (groupId, userId, callback) => {
  if(!ObjectId.isValid(groupId) || !ObjectId.isValid(userId))
    return callback('Invalid Group or User Id !')
  
  User.findOne({_id: userId}, (err, user) => {
    if(err)
      return callback(err, 500, null);
    else if(!user)
      return callback('No User Found !', 400, null);
    else
      Group.findOne({_id: groupId}, (err, group) => {
        if(err)
          return callback(err, 500, null);
        else if(!group)
          return callback("No Group Found !", 400, null);
        else{
          user.groups.push(groupId);
          user.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          })
        }
      });
  })
}


// Get posts of a group
const getGroupPosts = (groupId, callback) => {
  if(!ObjectId.isValid(groupId))
    return callback('Invalid Group Id', 400, null);

  Post.find({groups: groupId})
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


module.exports = {
  getAllColleges,
  addCollege,
  addDepartment,
  addClass,
  getCollege,
  getDepartment,
  getCollegeDepartments,
  getCollegeClass,
  getDepartmentClass,
  getGroupStudents,
  joinGroup,
  getGroupPosts
}