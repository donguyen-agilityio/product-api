const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
