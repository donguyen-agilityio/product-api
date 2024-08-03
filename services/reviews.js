const mongoose = require('mongoose');
const Review = require('../models/review');

function createReview({ rating = 5, comment, userId, productId }) {
  return Review.create({
    rating,
    comment,
    user: mongoose.Types.ObjectId.createFromHexString(userId),
    product: mongoose.Types.ObjectId.createFromHexString(productId)
  });
}

async function getReviewById(id) {
  const reviews = await Review.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) }
    },
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
        _id: 0,
        id: '$_id',
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
  ]);

  return reviews[0];
}

async function getReviewsByProductId(productId) {
  const result = await Review.aggregate([
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
              _id: 0,
              id: '$_id',
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

  const reviews = result[0].reviews;
  const totalCount = result[0].totalCount[0] || { count: 0 };
  const count = totalCount.count;

  return {
    reviews,
    count: count
  };
}

module.exports = { createReview, getReviewById, getReviewsByProductId };
