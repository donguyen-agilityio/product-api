const mongoose = require('mongoose');
const Review = require('../models/review');

function createReview({ rating = 5, comment, userId, productId }) {
  return Review.create({
    rating,
    comment,
    user: userId,
    product: productId
  });
}

function getReviewsByProductId(productId) {
  return Review.aggregate([
    {
      $match: { product: mongoose.Types.ObjectId.createFromHexString(productId) }
    },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        reviews: [
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $unwind: '$user'
          },
          {
            $lookup: {
              from: 'products',
              localField: 'product',
              foreignField: '_id',
              as: 'product'
            }
          },
          {
            $unwind: '$product'
          },
          {
            $project: {
              rating: 1,
              comment: 1,
              createdAt: 1,
              user: {
                name: 1,
                avatar: 1
              },
              productId: '$product._id'
            }
          }
        ]
      }
    }
  ]);
}

module.exports = { createReview, getReviewsByProductId };
