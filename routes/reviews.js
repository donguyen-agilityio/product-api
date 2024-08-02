const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByProductId
} = require('../services/reviews');

router.get('/:productId', async (req, res) => {
  try {
    const result = await getReviewsByProductId(req.params.productId);

    console.log('result', result);

    const reviews = result[0].reviews;
    const totalCount = result[0].totalCount[0] || { count: 0 };
    const count = totalCount.count;

    res.status(200).json({
      reviews,
      count: count
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = await createReview(req.body);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
