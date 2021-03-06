// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true, default: 'Normal'}, // Can Accept College, Department or Class
  parent: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }], // Array of Parent Group Id's
  meta: {type: Object, required: true, default: {}}
}, {
  versionKey: false
});

const validateType = type => {
  switch(type){
    case 'Normal':
      return true;
    case 'College':
      return true;
    case 'Department':
      return true;
    case 'Class':
      return true;
    default: 
      return false
  }
}

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;