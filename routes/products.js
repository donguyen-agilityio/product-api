const express = require('express');
const router = express.Router();
const store = require('store2');
const {
    max,
    paginate,
    covertArrayToSumObject,
    covertArrayToCountObject,
    buildProductsAverageRating,
    filterProductsByQueryData
} = require('../helpers');

router.get('/settings', (req, res) => {
    try {
        const products = store('products');
        const types = Object.values(
            covertArrayToCountObject({
                data: products,
                prop: 'type'
            })
        );
        const maxPrice = max({
            data: products,
            prop: 'price'
        });

        res.status(200).json({
            types,
            colors: ['ff0000', '006CFF', '171717'],
            maxPrice
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const products = store('products');
        const product = products.find(
            item => item.id === req.params.id
        );

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const reviews = store('reviews');
        const productReviews = covertArrayToSumObject({
            data: reviews,
            prop: 'productId',
            valueProp: 'rating'
        });

        const review = productReviews[product.id] || {};
        const rating = Math.round(review.rating / review.count) || 0;

        res.status(200).json({ ...product, rating });
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
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;
        const products = store('products');

        const filterProducts = filterProductsByQueryData({
            data: products,
            type,
            color,
            minPrice,
            maxPrice
        });

        const paginatedProducts = paginate(
            filterProducts,
            pageSize,
            pageNumber
        );

        const reviews = store('reviews');
        const productReviews = covertArrayToSumObject({
            data: reviews,
            prop: 'productId',
            valueProp: 'rating'
        });

        const finalProducts = buildProductsAverageRating(
            paginatedProducts,
            productReviews
        );

        res.status(200).json({
            products: finalProducts,
            count: filterProducts.length
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
