// Dependencies
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { College, Department, Class, Student, Post} = require('./../../models');

// Get all deparmtents
let getAllDepartments = (callback) => {
  Department.find({})
    .populate({path: 'college', select: 'name'})
    .exec((err, classes) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, classes);
    })
}

// Add New Department
let addDepartment = (collegeId, data, callback) => {
  if(!ObjectId.isValid(collegeId))
    return callback('Invalid College Id', 400, null);
  
  College.findOne({_id: collegeId})
    .select('name')
    .exec((err, college) => {
      if(err)
        return callback(err, 500, null);
      else if(!college)
        return callback('No College Found', 404, null);
      else{
        let c = new Department(data);
        c.college = collegeId;
        c.save((err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, success);
        })      
      }
    }) 
}

// Get a particular Deparment
let getDepartment = (departmentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Class ID', 400, null);
  
  Department.findOne({_id: classId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, success);
  });
}

// Get Department Classes
let getDepartmentClasses = (departmentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Department Id', 400, null);

  Class.find({department: departmentId}, (err, classes) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, classes);
  })
}

// Get Department Students
let getDepartmentStudents = (departmentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Department Id', 400, null);

  Student.find({department: departmentId}, (err, students) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, students);
  })
}

// Get Department Posts
let getDepartmentPosts = (departmentId, studentId, callback) => {
  if(!ObjectId.isValid(departmentId))
    return callback('Invalid Department Id', 400, null);

  Post.find({department: departmentId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(success.length === 0)
      return callback(null, 200, success);
    else{

      let i=0;
      success.forEach(post => {
        i++;

        Student.findOne({_id: post.owner}, 'name photoUrl', (err, owner) => {
          if(err)
            return callback(err, 500, null);
          else if(!owner)
            return callback('No Student Found', 404, null);
          else
            return callback(null, 200, Object,assign({}, success, {owner}));
        })
      });
    }
  });
}

// Join Department
let joinDepartment = (departmentId, studentId, callback) => {
  if(!ObjectId.isValid(departmentId) || !ObjectId.isValid(studentId))
    return callback('Invalid Department or Student Id', 400, null);
  
  Department.findOne({_id: departmentId}, (err, department) => {
    if(err)
      return callback(err, 500, null);
    else if (department == null)
      return callback('No Department Found', 404, null);
    else{
      Student.findOne({_id: studentId}, (err, student) => {
        if(err)
          return callback(err, 500, null);
        else if (student == null)
          return callback('No Student Found', 404, null);
        else{
          student.department = departmentId;
          student.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          });
        }
      })
    }
  })
}

module.exports = {
  getAllDepartments,
  getDepartment,
  getDepartmentClasses,
  getDepartmentStudents,
  getDepartmentPosts,
  addDepartment,
  joinDepartment
}