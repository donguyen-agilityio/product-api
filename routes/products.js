const express = require('express');
const router = express.Router();
const store = require('store2');
const { paginate } = require('../helpers/pagination');
const { between, equal } = require('../helpers/filter');

router.get('/:id', (req, res) => {
    try {
        const products = store('products') || [];
        const product = products.find(
            item => item.id === req.params.id
        );

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', (req, res) => {
    try {
        const type = req.query.type || '';
        const color = req.query.color || '';
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 0;
        const pageSize = req.query.pageSize || 4;
        const pageNumber = req.query.pageNumber || 1;

        const products = store('products') || [];
        const filterProducts = products.filter(item => {
            return (
                between(minPrice, item.price, maxPrice) &&
                equal(type, item.type) &&
                equal(color, item.color)
            );
        });
        const paginatedProducts = paginate(
            filterProducts,
            pageSize,
            pageNumber
        );
        res.status(200).json({
            products: paginatedProducts,
            count: filterProducts.length
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
