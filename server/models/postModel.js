const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: [true, 'A post must have a title'] },
  message: { type: String, required: [true, 'A message must have a title'] },
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
