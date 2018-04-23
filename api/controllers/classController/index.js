// Dependencies
const mongoose = require('mongoose');
const schema = require('./../../models/schema');
const { ObjectId } = require('mongodb');

// Model
let Class = mongoose.model('Class', schema.classSchema);
let College = mongoose.model('College', schema.collegeSchema);
let Department = mongoose.model('Department', schema.departmentSchema);
let Student = mongoose.model('Student', schema.studentSchema);

// Get all classes
let getAllClasses = (callback) => {
  Class.find({}, (err, classes) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, classes);
  })
}

// Add New Class
let addClass = (collegeId, departmentId, data, callback) => {
  if(!ObjectId.isValid(collegeId) || !ObjectId.isValid(departmentId))
    return callback('Invalid College Id or Department Id', 400, null);
  
  College.findOne({_id: collegeId})
    .select('name')
    .exec((err, college) => {
      if(err)
        return callback(err, 500, null);
      else if(!college)
        return callback('No College Found', 404, null);
      else{
        Department.findOne({_id: departmentId})
        .select('name')
        .exec((err, department) => {
          if(err)
            return callback(err, 500, null);
          else if(!department)
            return callback('No Department Found', 404, null);
          else{
            let c = new Class(data);
            c.collegeId = collegeId;
            c.departmentId = departmentId;
            c.classCode = data.name.split(' ').join('_').toUpperCase();
            c.save((err, success) => {
              if(err)
                return callback(err, 500, null);
              else
                return callback(null, 200, success);
            })    
          }  
        })
      }
    }) 
}

// Get a particular Class
let getClass = (classId, callback) => {
  if(!ObjectId.isValid(classId))
    return callback('Invalid Class ID', 400, null);
  
  Class.findOne({_id: classId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, success);
  });
}

// Join Class
let joinClass = (classId, studentId, callback) => {
  if(!ObjectId.isValid(classId) || !ObjectId.isValid(studentId))
    return callback('Invalid Class or Student Id', 400, null);
  
  Class.findOne({_id: classId}, (err, class_) => {
    if(err)
      return callback(err, 500, null);
    else if (class_ == null)
      return callback('No Class Found', 404, null);
    else{
      Student.findOne({_id: studentId}, (err, student) => {
        if(err)
          return callback(err, 500, null);
        else if (student == null)
          return callback('No Student Found', 404, null);
        else{
          student.classId = classId;
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
  getAllClasses,
  getClass,
  addClass,
  joinClass
}