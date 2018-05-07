// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const studentSchema = Schema({
  name: {type: String, default: 'none'},
  email: {type: String, default: 'none'},
  phone: {type: String, default: 'none'},
  password: {type: String, required: true},
  photoURL: {type: String, default: 'none'},
  providerData: {type: Array, default: ['email']},
  regNo: {type: String, default: 'none'},
  academicYear: {type: String, default: 'none'},
  isFresher: {type: Boolean, default: true},
  classJoined: {type: Boolean, default: false},
  class: {type: Schema.Types.ObjectId,  ref: 'Class'},
  department: {type: Schema.Types.ObjectId, ref: 'Department'},
  college: {type: Schema.Types.ObjectId, ref: 'College'},
  isCR: {type: Boolean, requird: true, default: false},
  phoneVerified: {type: Boolean, required: true, default: false},
  emailVerified: {type: Boolean, required: true, default: false},
  termsAndConditions: {type: Boolean, default: false}
}, {
  versionKey: false
});

// Hash methods for Students
studentSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

studentSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;