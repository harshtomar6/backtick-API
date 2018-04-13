// Dependencies
let mongoose = require('mongoose');
let schema = require('./../../models/schema');

// Model
let College = mongoose.model('College', schema.collegeSchema);

// Get All Colleges
let getAllColleges = callback => {
  College.find({}, (err, colleges) => {
    return callback(err, colleges);
  });
}

// Get a particular college
let getCollege = (id, callback) => {
  College.findOne({_id: id}, (err, college) => {
    if(err)
      return callback(err, null);
    else if(college == null)
      return callback('No College Found');
    else
      return callback(err, college);
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
  College.findOne({_id: id}, (err, college) => {
    if(err)
      return callback(err, null);
    else if(college == null)
      return callback('No College Found', null);
    else
      College.update({_id: id}, data, (err, done) => {
        let c = Object.assign(college, data);
        return callback(err, c);
      })
  })
}

// Get College Departments

module.exports = {
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege
}