const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  body: {
    type: String,
    required: 'There must be a comment',
    trim: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'There must be a author'
  },
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
}, { timestamp: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;