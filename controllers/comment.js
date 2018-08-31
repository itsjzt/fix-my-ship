const mongoose = require('mongoose');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const comment = req.body
  comment.post = req.params['id']
  comment.author = req.user._id
  await new Comment(comment).save()
  req.flash("info", "Your comment is posted!")
  res.redirect('back')
}

exports.deleteComment = (req, res) => { }
