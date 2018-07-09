// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  text: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  parentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
  childrens: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: []
  }] // Array of Comment Id's
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
