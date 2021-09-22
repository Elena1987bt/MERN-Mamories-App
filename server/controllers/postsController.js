const mongoose = require('mongoose');
const Post = require('../models/postModel');

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ _id: -1 }) // sort by the newest
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      posts: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  // console.log(searchQuery, tags);
  try {
    const title = new RegExp(searchQuery, 'i');
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
};
exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
exports.createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await Post.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
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
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

exports.commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);
  post.comments.push(value);
  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};
