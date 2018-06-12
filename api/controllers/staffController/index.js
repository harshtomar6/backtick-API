// Dependencies
const { Staff } = require('./../../models');
const { ObjectId } = require('mongodb');
const auth = require('./../../../auth');

// Get All Staff
const getAllStaff = callback => {
  Staff.find({})
    .populate('clasess')
    .exec((err, staff) => {
      return callback(err, staff);
    });
}

// Get A Staff
const getStaff = (staffId, callback) => {
  if(!ObjectId.isValid(staffId))
    return callback('Invalid Staff Id', 400, null);

  Staff.findOne({_id: staffId})
    .populate('college')
    .populate('department')
    .exec((err, staff) => {
      if(err)
        return callback(err, 500, null);
      else if(!staff)
        return callback('No Staff Found !', 400, null);
      else
        return callback(null, 200, staff);
    });
}

// Get Staff By ID (authentication)
const getStaffById = (staffId, callback) => {
  if(!ObjectId.isValid(staffId))
    return callback('Invalid Staff Id', 400, null);
  
  Staff.findOne({_id: staffId}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(!staff)
      return callback('No Staff Found', 404, null);
    else
      return callback(null, 200, staff);
  });
}

// Add Staff
const addStaff = (data, callback) => {
  Staff.findOne({email: data.email.toLowerCase()}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(staff)
      return callback('Email already registered !', 400, null);
    else{
      let staff = new Staff(data);
      data.email = data.email.toLowerCase();
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

// Add or find staff for social media login
const addOrFindStaff = (data, callback) => {
  Staff.findOne({email: data.email.toLowerCase()}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(staff)
      return callback(null, 200, auth.generateToken(staff));
    else{
      let staff = new Staff(data);
      data.email = data.email.toLowerCase();
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

// Update Information
let modifyStaff = (id, data, callback) => {
  if(!ObjectId.isValid(id)){
    return callback('Invalid Staff ID', 400, null);
  }
  Staff.findOne({_id: id}, (err, staff) => {
    if(err)
      return callback(err, 500, null);
    else if(staff == null)
      return callback('No Student Found', 400, null);
    else{
      let update = Object.assign({}, staff._doc, data);
      Staff.update({_id: id}, data, (err, success) => {
        return callback(err, 200, update);
      });
    }
  });
};


module.exports = {
  getAllStaff,
  getStaff,
  getStaffById,
  addStaff,
  addOrFindStaff,
  modifyStaff
}