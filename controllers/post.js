const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.addPostGet = (req, res) => {
  res.render('post/addPost', { title: 'Add Post' });
};

exports.addNewPost = async (req, res) => {
  const postData = { ...req.body, author: req.user };
  const post = await new Post(postData).save();
  res.json(post);
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
