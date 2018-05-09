// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testPostSchema = Schema({
  text: {type: String, required: true},
  likes: {type: Number, default: 0},
  postedAt: {type: Date, default: Date.now}
});

const TestPosts = mongoose.model('TestPost', testPostSchema);

module.exports = TestPosts;