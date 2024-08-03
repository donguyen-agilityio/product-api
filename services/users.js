const User = require('../models/user');

function createUser({ name, userName, avatar }) {
  return User.create({
    name,
    userName,
    avatar
  });
}

function getUsers() {
  return User.find();
}

module.exports = { createUser, getUsers };
