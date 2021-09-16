const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwb = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Check if the user exist
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .json({ message: 'No user with that email address!' });

    // 2. Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Invalid credentials!' });

    // 3. If there is a user and password is correct crate jwt
    const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
      expiresIn: '1h',
    });

    res.status(200).json({ result: user, token: token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    // 1. Check if the user exist
    const user = await User.findOne({ email: email });
    if (user) return res.status(404).json({ message: 'User already exists!' });
    // 2. Check if password is equal to confirmPassword
    if (password !== confirmPassword) {
      res.status(404).json({ message: 'Password do not match' });
    }
    // 3. Hash the Password
    const hashedPassword = await bcrypt.hash(password, 12);
    // 4. Create User
    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    // 5. Create jwt
    const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
      expiresIn: '1h',
    });
    newUser.save();
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
