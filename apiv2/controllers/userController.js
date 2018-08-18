// Dependencies
const { ObjectId } = require('mongodb');
const { User, Superuser } = require('./../models');
const { generateToken, generateTokenForAdmin,
  generateTokenForSuperuser } = require('./../auth');
const { getCollege } = require('./groupController');

// Add Student
const addStudent = (data, callback) => {
  User.findOne({email: data.email.toLowerCase(), type: 'Student'})
    .populate('groups')
    .exec((err, student) => {
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
  User.findOne({email: data.email.toLowerCase(), type: 'Staff'})
    .populate('groups')
    .exec((err, staff) => {
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
  User.findOne({email: data.email.toLowerCase(), type: 'Admin'})
    .populate('groups')
    .exec((err, admin) => {
      if(err)
        return callback(err, 500, null);
      else if(admin){
        return callback(null, 200, generateTokenForAdmin(admin));
      }
      else{
        getCollege(data.college, (err, status, college) => {
          if(status === 200){
            let admin = new User(data);
            admin.email = data.email.toLowerCase();
            admin.type = 'Admin';
            admin.groups.push(data.college);

            if(data.password)
              admin.password = admin.genHash(data.password);
            else
              admin.password = admin.genHash('NOPASSWORD');

            admin.save((err, success) => {
              if(err)
                return callback(err, 500, null);
              else
                return callback(null, 200, generateTokenForAdmin(success));
            });
          }else
            return callback(err, status, null);
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
            return callback(null, 200, generateTokenForSuperuser(su));
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
                return callback(null, 200, generateTokenForSuperuser(success));
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
      return callback(err, 500, null);
    else if(!superuser)
      return callback("No SuperUser Exists",404, null);
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
      return callback('No Student Found', 404, null);
    else
      return callback(null, 200, user);
  });
}

// Update Information
let modifyUser = (id, data, callback) => {
  if(!ObjectId.isValid(id)){
    return callback('Invalid User ID', 400, null);
  }
  User.findOne({_id: id}, (err, user) => {
    if(err)
      return callback(err, 500, null);
    else if(user == null)
      return callback('No User Found', 400, null);
    else{
      let update = Object.assign({}, user._doc, data);
      User.update({_id: id}, data, (err, success) => {
        return callback(err, 200, update);
      });
    }
  });
};


module.exports = {
  getUserById,
  addAdmin,
  addStudent,
  addStaff,
  addSuperuser,
  getAllStudents,
  getSuperuser,
  modifyUser
}