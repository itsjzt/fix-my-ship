const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.addPostGet = (req, res) => {
  res.render('post/addPost', { title: 'Add Post' });
};

exports.addNewPost = async (req, res) => {
  const postData = { ...req.body, author: req.user };
  const post = await new Post(postData).save();
  res.redirect(`/post/${post.slug}`);
};

exports.viewAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.render('home', { title: "Fix My 'Ship", posts });
};

exports.viewPost = async (req, res) => {
  const slug = req.params.slug;
  const post = await Post.findOne({ slug });
  res.render('post/viewPost', { title: post.title, post });
};

exports.deletePost = async (req, res) => {
  await Post.findOneAndRemove({ slug: req.params.slug });
  req.flash('danger', '<strong>Danger</strong> Your Post is deleted now!');
  res.redirect('/');
};

exports.updateRequest = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.render('post/updatePost', { title: 'Update Post', post });
};

exports.updatePost = async (req, res) => {
  const [slug, body] = [req.params.slug, req.body];
  const post = await Post.findOneAndUpdate(
    { slug },
    { $set: body },
    { new: true, runValidators: true }
  );
  req.flash('info', 'Your post got updated!');
  res.redirect(`/post/${post.slug}`);
};
