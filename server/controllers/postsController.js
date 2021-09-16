const mongoose = require('mongoose');
const Post = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
exports.createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await Post.create(post);
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);
    res.status(204).json(null);
  } catch (err) {
    console.log(err);
  }
};
exports.likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // Like
      post.likes.push(req.userId);
    } else {
      // Dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};
