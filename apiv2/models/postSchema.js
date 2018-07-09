// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  owner: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  postedBy: {type: String, required: true}, // Should accept either Student or Staff
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User', 
    default: []
  }], // Array of Object id's of Users 
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: []
  }], // Array of Comment id's
  text: {type: String, required: true}, // Text
  attachment: {type: Array, default: []}, // Array of {category: string, url: String}
  timestamp: {type: Date, default: Date.now},
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
    default: []
  }]
}, {
  versionKey: false
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
