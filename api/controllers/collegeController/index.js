// Dependencies
const mongoose = require('mongoose');
const { College, Department, Class, Student, Post, Staff} = require('./../../models');
const { ObjectId } = require('mongodb');

// Get All Colleges
let getAllColleges = callback => {
  College.find({}, (err, colleges) => {
    return callback(err, colleges);
  });
}

// Get a particular college
let getCollege = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid College Id', 400, null);

  College.findOne({_id: id}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if(college == null)
      return callback('No College Found', 404, null);
    else
      return callback(err, 200, college);
  })
}

// Add a college
let addCollege = (data, callback) => {
  let college = new College(data);
  college.save((err, success) => {
    return callback(err, success);
  });
}

// Modify College Details
let modifyCollege = (id, data, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid College Id', 400, null);

  College.findOne({_id: id}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if(college == null)
      return callback('No College Found', 404, null);
    else
      College.update({_id: id}, data, (err, done) => {
        let c = Object.assign(college, data);
        if(err)
          return (err, 500, null);
        else
          return (null, 200, c);
      })
  })
}

// Get College Departments
let getCollegeDepartments = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid CollegeId', 400, null);
  
  Department.find({college: collegeId}, (err, departments) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, departments); 
  });
}

// Get College Classes
let getCollegeClasses = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid CollegeId', 400, null);
  
  Class.find({college: collegeId}, (err, classes) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, classes); 
  });
}

// Get College Students
let getCollegeStudents = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid CollegeId', 400, null);
  
  Student.find({}, (err, students) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, students); 
  });
}

// Get College Posts
let getCollegePosts = (collegeId, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid College Id', 400, null);
  
  Post.find({college: collegeId}, (err, posts) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, posts);
  });
}

// Join College
let joinCollege = (collegeId, studentId, callback) => {
  if(!ObjectId.isValid(collegeId) || !ObjectId.isValid(studentId))
    return callback('Invalid College or Student Id', 400, null);
  
  College.findOne({_id: collegeId}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if (college == null)
      return callback('No College Found', 404, null);
    else{
      Student.findOne({_id: studentId}, (err, student) => {
        if(err)
          return callback(err, 500, null);
        else if (student == null)
          return callback('No Student Found', 404, null);
        else{
          student.college = collegeId;
          student.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          });
        }
      })
    }
  });
}

// Join College Staff
const joinCollegeStaff = (collegeId, staffId, callback) => {
  if(!ObjectId.isValid(collegeId) || !ObjectId.isValid(staffId))
    return callback('Invalid College or Staff Id', 400, null);

  College.findOne({_id: collegeId}, (err, college) => {
    if(err)
      return callback(err, 500, null);
    else if (college == null)
      return callback('No College Found', 404, null);
    else{
      Staff.findOne({_id: staffId}, (err, staff) => {
        if(err)
          return callback(err, 500, null);
        else if (staff == null)
          return callback('No Staff Found', 400, null);
        else{
          staff.college = collegeId;
          staff.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          });
        }
      })
    }
  });
}

module.exports = {
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege,
  joinCollege,
  joinCollegeStaff,
  getCollegeDepartments,
  getCollegeClasses,
  getCollegeStudents,
  getCollegePosts
}