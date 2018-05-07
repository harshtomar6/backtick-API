// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  owner: {type: Schema.Types.ObjectId, required: true, refPath: 'postedBy'},
  class: {type: Schema.Types.ObjectId, required: true, ref: 'Class'},
  department: {type: Schema.Types.ObjectId, required: true, ref: 'Department'},
  college: {type: Schema.Types.ObjectId, required: true, ref: 'College'},
  postedBy: {type: String, required: true}, // Should accept either Student or Staff
  likes: {type: Array, default: []}, // Array of Object id's of either Student or Staff and name 
  comments: {type: Array, required: true, default: []}, // Array of Comment id's
  text: {type: String, required: true}, // Text
  attachment: {type: Array, default: []}, // Array of {category: string, url: String}
  timestamp: {type: Date, default: Date.now},
  level: {type: Number, required: true, default: 10} // Levels Should accept one of these 10 | 20 | 30
}, {
  versionKey: false
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;