// Dependencies
let mongoose = require('mongoose');

let collegeSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  meta: {type: Object, required: true}, // Contains info about college
});

let departmentSchema = mongoose.Schema({
  name: {type: String, required: true},
  collegeId: {type: String, required: true},
  meta: {type: Object, required: true}
});

let classSchema = mongoose.Schema({
  name: {type: String, required: true},
  departmentId: {type: String, required: true},
  collegeId: {type: String, required: true},
  classCode: {type: String, required: true},
  meta: {type: Object, required: true}
});

let studentSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  classId: {type: String, required: true},
  departmentId: {type: String, required: true},
  collegeId: {type: String, required: true},
  isCR: {type: Boolean, requird: true, default: false}
});

let staffSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  designation: {type: String, required: true},
  departmentId: {type: String},
  collegeId: {type: String, required: true},
});

let postSchema = mongoose.Schema({
  ownerid: {type: String, required: true},
  postedBy: {type: String, required: true}, // Should accept either Student or Staff
  likes: {type: Array, required: true, default: []}, // Array of Object id's of either Student or Staff 
  text: {type: String, required: true}, // Text
  attachment: {type: Array, default: []}, // Array of {category: string, url: String}
  timestamp: {type: Date, default: Date.now},
  level: {type: Number, required: true, default: 10}
});

let announcementSchema = mongoose.Schema({
  title: {type: String, required: true},
  level: {type: Number, required: true, default: 10},
  timestamp: {type: Date, default: Date.now},
  deadline: {type: Date},
  ownerid: {type: String, required: true}
});

let testPost = mongoose.Schema({
  text: {type: String, required: true},
  postedAt: {type: Date, default: Date.now},
  likes: {type: Number, default: 0}
})

module.exports = {
  collegeSchema,
  departmentSchema,
  classSchema,
  studentSchema,
  staffSchema,
  postSchema,
  announcementSchema,
  testPost
}