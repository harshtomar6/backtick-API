// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let staffSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  designation: {type: String, required: true},
  department: {type: Schema.Types.ObjectId, ref: 'Department'},
  college: {type: Schema.Types.ObjectId, required: true, ref: 'College'},
});



let commentSchema = mongoose.Schema({
  text: {type: String, required: true},
  ownerid: {type: String, required: true},
  parentId: {type: String, required: true, default: 'none'},
  childrens: {type: Array, required: true, default: []} // Array of Comment Id's
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
