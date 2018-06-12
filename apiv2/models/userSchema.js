// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = Schema({
  name: {type: String, default: 'none'},
  email: {type: String, default: 'none'},
  phone: {type: String, default: 'none'},
  password: {type: String, required: true},
  photoURL: {type: String, default: 'none'},
  providerData: {type: Array, default: ['email']},
  regNo: {type: String, default: 'none'},
  type: {type: String, default: 'Student'}, // Can Accept Either Staff or Student or Admin
  academicYear: {type: String, default: 'none'},
  isFresher: {type: Boolean, default: true},
  classJoined: {type: Boolean, default: false},
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
    permissions: {type: String, default: 'rw-'} // Can Accept r|-w|- m|-
  }],
  phoneVerified: {type: Boolean, required: true, default: false},
  emailVerified: {type: Boolean, required: true, default: false},
  termsAndConditions: {type: Boolean, default: false},
  savedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  versionKey: false
});

// Hash methods for Students
userSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;