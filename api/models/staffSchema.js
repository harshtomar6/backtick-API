// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const staffSchema = Schema({
  name: {type: String, default: 'none'},
  email: {type: String, default: 'none'},
  phone: {type: String, default: 'none'},
  password: {type: String, required: true},
  providerData: {type: Array, default: ['email']},
  photoURL: {type: String, default: 'none'},
  designation: {type: String, default: 'none'},
  classJoined: {type: Boolean, default: false},
  college: {type: Schema.Types.ObjectId, ref: 'College'},
  department: {type: Schema.Types.ObjectId, ref: 'Department'},
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
  }],
  phoneVerified: {type: Boolean, required: true, default: false},
  emailVerified: {type: Boolean, required: true, default: false},
  termsAndConditions: {type: Boolean, default: false}
},{
  versionKey: false
});

// Hash methods for Staff
staffSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

staffSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;