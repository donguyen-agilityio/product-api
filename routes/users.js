const express = require('express');
const router = express.Router();
const store = require('store2');

router.get('/:userName', (req, res) => {
    try {
        const users = store('users') || [];
        const user = users.find(
            item => item.userName === req.params.userName
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
