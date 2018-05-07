// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = Schema({
  name: {type: String, required: true, unique: true},
  department: {type: Schema.Types.ObjectId, required: true, ref: 'Department'},
  college: {type: Schema.Types.ObjectId, required: true, ref: 'College'},
  classCode: {type: String, required: true, unique: true},
  meta: {type: Object, required: true, default: {}}
}, {
  versionKey: false
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;