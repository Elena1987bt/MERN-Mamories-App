const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'A user must have a name'] },
  email: { type: String, required: [true, 'A user must have an email'] },
  password: {
    type: String,
    required: [true, 'A user must provide a password'],
  },
  id: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
