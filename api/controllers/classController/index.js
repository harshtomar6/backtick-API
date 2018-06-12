// Dependencies
const mongoose = require('mongoose');
const { Class, College, Department, Student, Staff } = require('./../../models');
const { ObjectId } = require('mongodb');

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
            c.college = collegeId;
            c.department = departmentId;
            c.classCode = getClassCode(college.name, department.name, data.name);
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

// Get all students of a class
let getClassStudents = (classId, callback) => {
  if(!ObjectId.isValid(classId))
    return callback('Invalid Class Id', 400, null);
  
  Student.find({class: classId}, (err, success) => {
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
          student.class = classId;
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

// Join Class Staff
const joinClassStaff = (classId, staffId, callback) => {
  if(!ObjectId.isValid(classId) || !ObjectId.isValid(staffId))
    return callback('Invalid Class or Staff Id', 400, null);
  
  Class.findOne({_id: classId}, (err, class_) => {
    if(err)
      return callback(err, 500, null);
    else if (class_ == null)
      return callback('No Class Found', 404, null);
    else{
      Staff.findOne({_id: staffId}, (err, staff) => {
        if(err)
          return callback(err, 500, null);
        else if (staff == null)
          return callback('No Staff Found', 404, null);
        else{
          staff.classes.push(classId);
          staff.classJoined = true;
          staff.save((err, success) => {
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

// Join Class by class code
let joinClassByCode = (code, studentId, callback) => {
  Class.findOne({classCode: code}, (err, class_) => {
    if(err)
      return callback(err, 500, null);
    else if(class_ == null)
      return callback('No Class Found', 404, null);
    else{
      Student.findOne({_id: studentId}, (err, student) => {
        if(err)
          return callback(err, 500, null);
        else if (student == null)
          return callback('No Student Found', 404, null);
        else{
          student.class = class_._id;
          student.department = class_.department;
          student.college = class_.college;
          student.classJoined = true;
          student.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, success);
          });
        }
      });
    }
  })
}

let getClassCode = (collegeName, departmentName, className) => {
  let collegeInitials = '', departmentInitails = '', classInitials = '';
  
  collegeName.split(' ').forEach(element => {
    collegeInitials += element.split('')[0].toUpperCase();
  });

  departmentName.split(' ').forEach(element => {
    departmentInitails += element.split('')[0].toUpperCase();
  })

  className.split(' ').forEach(element => {
    classInitials += element.split('')[0].toUpperCase();
  });

  return 'BT_'+collegeInitials+'_'+departmentInitails+'_'+classInitials
}


module.exports = {
  getAllClasses,
  getClass,
  addClass,
  getClassStudents,
  joinClass,
  joinClassStaff,
  joinClassByCode
}