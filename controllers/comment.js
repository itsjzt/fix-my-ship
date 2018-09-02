const mongoose = require('mongoose');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const comment = req.body;
  comment.post = req.params['id'];
  comment.author = req.user._id;
  await new Comment(comment).save();
  req.flash('success', 'Your comment is posted!');
  res.redirect('back');
};

exports.deleteComment = async (req, res) => {
  const { commentid } = req.params;
  const comment = await Comment.findById(commentid);
  if (comment.author._id.equals(req.user._id)) {
    await Comment.findOneAndRemove({ _id: comment._id });
    req.flash('success', 'Comment deleted!');
  } else {
    req.flash('danger', "You can't delete this comment!");
  }
  res.redirect('back');
};

exports.upvote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  await Comment.findOneAndUpdate(id, {
    $push: { upvotes: userId }
  });
  req.flash('success', 'Upvoted Comment');
  res.redirect('back');
};

exports.downvote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  await Comment.findOneAndUpdate(id, {
    $pull: { upvotes: userId }
  });
  req.flash('warning', 'Downvoted Comment');
  res.redirect('back');
};
