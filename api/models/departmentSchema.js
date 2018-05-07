// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = Schema({
  name: {type: String, required: true, unique: true},
  college: {type: Schema.Types.ObjectId, required: true, ref: 'College'},
  meta: {type: Object, required: true, default: {}}
}, {
  versionKey: false
});

const Department = mongoose.model('Deparment', departmentSchema);

module.exports = Department;