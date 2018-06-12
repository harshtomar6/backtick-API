// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const superuserSchema = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

// Hash methods for SuperUser
superuserSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

superuserSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

const Superuser = mongoose.model('Superuser', superuserSchema);

module.exports = Superuser;