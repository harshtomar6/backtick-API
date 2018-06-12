// Dependencies
const mongoose = require('mongoose');
const { Student } = require('./../../models');
const { ObjectId } = require('mongodb');
const auth = require('./../../../auth');

// Get all students
let getAllStudents = (callback) => {
  Student.find({})
    .populate({
      path: 'savedPosts', 
      populate: {
        path: 'likes', select: 'name photoURL',
      }
    })
    .populate({
      path: 'savedPosts',
      populate: {
        path: 'owner',
        select: 'name photoURL'
      }
    })
    .exec((err, students) => {
      return callback(err, students);
    });
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
  if(process.env.DEVELOPMENT)
    Student.findOne({email: data.email.toLowerCase()}, (err, found) => {
      if(err)
        return callback(err, 500, null);
      else if(found)
        return callback('Email Already Registered', 400, null);
      else{
        let student = new Student(data);
        if(data.password)
          student.password = student.genHash(data.password);
        else
          student.password = student.genHash('NOPASSWORD');

        student.save((err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, auth.generateToken(success));
        });
      }
    });
  else{
    let student = new Student(data);
    student.save((err, success) => {
      if(err)
        return callback(err, 500, null);
      else
        return callback(null, 200, success);
    })
  }
}

let authenticateUser = (data, callback) => {

}

// FOR SOCIAL MEDIA LOGIN
let addOrFindStudent = (data, callback) => {
  Student.findOne({email: data.email.toLowerCase()}, (err, student) => {
    if(err)
      return callback(err, 500, null);
    else if(student){
      return callback(null, 200, auth.generateToken(student));
    }
    else{
      let student = new Student(data);
      data.email = data.email.toLowerCase();
      if(data.password)
        student.password = student.genHash(data.password);
      else
        student.password = student.genHash('NOPASSWORD');

      student.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, auth.generateToken(success));
      });
    }
  })
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
  addOrFindStudent,
  modifyStudent,
  setCR
}