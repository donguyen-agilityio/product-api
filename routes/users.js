const express = require('express');
const { createUser, getUsers } = require('../services/users');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await getUsers(req.query);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
