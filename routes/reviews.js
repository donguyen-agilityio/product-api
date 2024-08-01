const express = require('express');
const router = express.Router();
const store = require('store2');
const { paginate } = require('../helpers');

router.get('/:productId', (req, res) => {
    try {
        const pageSize = req.query.pageSize || 4;
        const pageNumber = req.query.pageNumber || 1;
        const productId = req.params.productId;

        const reviews = store('reviews');
        const filterReviews = reviews
            .filter(item => {
                return item.productId === productId;
            })
            .sort(
                (a, b) => new Date(b.ratingDate) - new Date(a.ratingDate)
            );
        // const paginatedReviews = paginate(
        //     filterReviews,
        //     pageSize,
        //     pageNumber
        // );

        const fullReviews = filterReviews.map(item => {
            const users = store('users');
            const user = users.find(i => i.id === item.userId);

            return {
                user: {
                    name: user.name,
                    avatar: user.avatar
                },
                comment: item.comment,
                rating: item.rating,
                ratingDate: item.ratingDate
            };
        });

        res.status(200).json({
            reviews: fullReviews,
            count: filterReviews.length
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', (req, res) => {
    try {
        const rating = req.body.rating;
        const comment = req.body.comment;
        const userName = req.body.userName;
        const productId = req.body.productId;

        const users = store('users');
        const reviews = store('reviews');
        const user = users.find(item => item.userName === userName);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const newReview = {
            userId: user.id,
            productId,
            comment,
            rating,
            ratingDate: new Date().toISOString()
        };

        reviews.push(newReview);
        store('reviews', reviews);

        res.status(201).json({
            user: {
                name: user.name,
                avatar: user.avatar
            },
            productId: newReview.productId,
            comment: newReview.comment,
            rating: newReview.rating,
            ratingDate: newReview.ratingDate
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/one/v1/:id', (req, res) => {
    try {
        const reviews = store('reviews') || [];
        const review = reviews.find(
            item => item.id === req.params.id
        );

        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        res.status(200).json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/all/v1', (req, res) => {
    try {
        const reviews = store('reviews') || [];

        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
