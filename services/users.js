const mongoose = require('mongoose');
const User = require('../models/user');

function createUser({ name, userName, avatar }) {
  return User.create({
    name,
    userName,
    avatar
  });
}

async function getUserById(id) {
  const users = await User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) }
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        avatar: 1,
        userName: 1,
        createdAt: 1
      }
    }
  ]);

  return users[0];
}

function getUsers() {
  return User.find();
}

module.exports = { createUser, getUserById, getUsers };
