// Dependencies
const { ObjectId } = require('mongodb');
const { User, Superuser } = require('./../models');
const { generateToken } = require('./../auth');

// Add Student
const addStudent = (data, callback) => {
  User.findOne({email: data.email.toLowerCase()}, (err, student) => {
    if(err)
      return callback(err, 500, null);
    else if(student){
      return callback(null, 200, generateToken(student));
    }
    else{
      let student = new User(data);
      student.email = data.email.toLowerCase();
      student.type = 'Student';
      if(data.password)
        student.password = student.genHash(data.password);
      else
        student.password = student.genHash('NOPASSWORD');

      student.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, generateToken(success));
      });
    }
  });
}

// Add Staff
const addStaff = (data, callback) => {
  User.findOne({email: data.email.toLowerCase()}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(staff){
      return callback(null, 200, generateToken(staff));
    }
    else{
      let staff = new User(data);
      staff.email = data.email.toLowerCase();
      staff.type = 'Staff';
      if(data.password)
        staff.password = staff.genHash(data.password);
      else
        staff.password = staff.genHash('NOPASSWORD');

      staff.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, auth.generateToken(success));
      });
    }
  });
}

// Add Admin
const addAdmin = (data, callback) => {
  User.findOne({email: data.email.toLowerCase()}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(staff){
      return callback(null, 200, generateToken(staff));
    }
    else{
      let staff = new User(data);
      staff.email = data.email.toLowerCase();
      staff.type = 'Admin';
      if(data.password)
        staff.password = staff.genHash(data.password);
      else
        staff.password = staff.genHash('NOPASSWORD');

      staff.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, auth.generateToken(success));
      });
    }
  });
}

// Add Superuser
const addSuperuser = (data, callback) => {
  Superuser.find({}, (err, sus) => {
    if(err)
      return callback(err, 500, null);
    else{
      if(!data.password || !data.email || !data.name)
        return callback('Incorrent Params', 400, null);

      Superuser.findOne({email: data.email.toLowerCase()}, (err, su) => {
        if(err)
          return callback(err, 500, null);
        else if(su){
          if(su.compareHash(data.password))
            return callback(null, 200, generateToken(su));
          else
            return callback('Wrong Password', 401, null);
        }else{
          if(sus.length >= 2)
            return callback('No More Admins Can Be Added !', 400, null);
          else{
            let s = new Superuser(data);
            s.email = data.email.toLowerCase();
            s.password = s.genHash(data.password);
            s.save((err, success) => {
              if(err)
                return callback(err, 500, null);
              else
                return callback(null, 200, generateToken(success));
            })
          }
        }
      });
    }
  });
}

const getSuperuser = (superuserId, callback) => {
  if(!ObjectId.isValid(superuserId))
    return callback('Invalid Superuser Id', 400, null);

  Superuser.findOne({_id: superuserId}, (err, superuser) => {
    if(err)
      return calback(err, 500, null);
    else if(!superuser)
      return callback("No SuperUser Exists",400, null);
    else
      return callback(null, 200, superuser);
  });
}

// Get All Students
const getAllStudents = callback => {
  User.find({type: 'Student'}, (err, students) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, students);
  });
}

// Get User By Id
const getUserById = (userId, callback) => {
  User.findOne({_id: userId}, (err, user) => {
    if(err)
      return callback(err, 500, null);
    else if(!user)
      return callback('No Student Found', 400, null);
    else
      return callback(null, 200, user);
  });
}


module.exports = {
  getUserById,
  addAdmin,
  addStudent,
  addStaff,
  addSuperuser,
  getAllStudents,
  getSuperuser
}