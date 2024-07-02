const express = require('express');
const router = express.Router();
const store = require('store2');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
    try {
        const products = store('products') || [];

        const newProduct = {
            id: uuidv4(),
            type: req.body.type,
            name: req.body.name,
            sizes: req.body.sizes,
            colors: req.body.colors
        };
        products.push(newProduct);

        store('products', products);

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const products = store('products') || [];
        const product = products.find(item => item.id === req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
