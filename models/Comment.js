const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: 'There must be a comment',
      trim: true
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: 'There must be a Post!'
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'There must be a author!'
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    upvotes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  },
  { timestamp: true }
);

function autoPopulate(next) {
  this.populate('author');
  next();
}

CommentSchema.pre('find', autoPopulate);
CommentSchema.pre('findOne', autoPopulate);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
