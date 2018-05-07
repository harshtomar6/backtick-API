// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  website: {type: String, required: true},
  location: {
    lat: {type: Number, required: true},
    lon: {type: Number, required: true}
  },
  meta: {type: Object, required: true}, // Contains info about college
}, {
  versionKey: false
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;