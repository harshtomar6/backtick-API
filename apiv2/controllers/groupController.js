// Dependencies
const { ObjectId } = require('mongodb');
const { Group } = require('./../models');

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
      return callback(err, 400, null);
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


module.exports = {
  getAllColleges,
  addCollege,
  addDepartment,
  getCollege,
  getCollegeDepartments
}