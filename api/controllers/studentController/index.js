// Dependencies
let mongoose = require('mongoose');
let schema = require('./../../models/schema');
const { ObjectId } = require('mongodb');

// Model
let Student = mongoose.model('Student', schema.studentSchema);

// Get all students
let getAllStudents = (callback) => {
  Student.find({}, (err, students) => {
    return callback(err, students);
  })
}

// Get a particular Student
let getStudent = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Student Id', 400, null);
  Student.findOne({_id: id}, (err, student) => {
    if(err)
      return callback(err, 500, null);
    else if(student == null)
      return callback('No Student Found', 404, null);
    else 
      return callback(err, 200, student);
  });
}

// Add a New Student
let addStudent = (data, callback) => {
  Student.findOne({email: data.email.toLowerCase()}, (err, found) => {
    if(err)
      return callback(err, 500, null);
    //else if(found)
      //return callback('Email Already Registered', 400, null);
    else{
      let student = new Student(data);
      student.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, student);
      });
    }
  });
}

// Update Information
let modifyStudent = (id, data, callback) => {
  if(!ObjectId.isValid(id)){
    return callback('Invalid Object ID', 400, null);
  }
  Student.findOne({_id: id}, (err, student) => {
    if(err)
      return callback(err, 500, null);
    else if(student == null)
      return callback('No Student Found', 404, null);
    else{
      let update = Object.assign({}, student._doc, data);
      Student.update({_id: id}, data, (err, success) => {
        return callback(err, 200, update);
      });
    }
  });
};

// Make a Student CR
let setCR = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Student ID', 400, null);

  Student.findOne({_id: id}, (err, student) => {
    if(err)
      return callback(err, 500, null);
    else if(student == null)
      return callback('No Student Found', 404, null);
    else{
      
    }
  });
}

module.exports = {
  getAllStudents,
  getStudent,
  addStudent,
  modifyStudent,
  setCR
}