const express = require('express');
const router = express.Router();
const { createReview, getReviewById, getReviewsByProductId } = require('../services/reviews');

router.post('/', async (req, res) => {
  try {
    const createdReview = await createReview(req.body);
    const review = await getReviewById(createdReview.id);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const data = await getReviewsByProductId(req.params.productId);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
