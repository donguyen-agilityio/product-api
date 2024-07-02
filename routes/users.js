const express = require('express');
const router = express.Router();
const store = require('store2');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
    try {
        const users = store('users') || [];
        const user = users.find(item => item.userName === req.body.userName);

        if (user) {
            throw Error('User already exists');
        } else {
            const newUser = {
                id: uuidv4(),
                userName: req.body.userName,
                avatar: req.body.avatar
            };
            users.push(newUser);
            store('users', users);

            res.status(201).json(newUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const users = store('users') || [];
        const user = users.find(item => item.id === req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
