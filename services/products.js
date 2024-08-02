const mongoose = require('mongoose');
const Product = require('../models/product');

function createProduct({
  name,
  type,
  description,
  category,
  price,
  images,
  colors,
  sizes
}) {
  return Product.create({
    name,
    type,
    description,
    category,
    price,
    images,
    colors,
    sizes
  });
}

function getProductById(productId) {
  return Product.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(productId)
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        reviewsCount: {
          $size: '$reviews'
        },
        averageRating: {
          $ifNull: [
            {
              $avg: '$reviews.rating'
            },
            0
          ]
        }
      }
    },
    {
      $project: {
        name: 1,
        type: 1,
        price: 1,
        category: 1,
        description: 1,
        sizes: 1,
        colors: 1,
        images: 1,
        reviewsCount: 1,
        averageRating: 1
      }
    }
  ]);
}

function getProducts({
  type,
  minPrice = 0,
  maxPrice = 0,
  page = 1,
  limit = 5
}) {
  const matchStage = {};

  if (type) {
    matchStage.type = type;
  }

  if (maxPrice) {
    matchStage.price = { $gte: minPrice, $lte: maxPrice };
  }

  return Product.aggregate([
    {
      $match: matchStage
    },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        products: [
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'product',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              reviewsCount: { $size: '$reviews' },
              averageRating: {
                $ifNull: [{ $avg: '$reviews.rating' }, 0]
              }
            }
          },
          {
            $project: {
              name: 1,
              type: 1,
              price: 1,
              category: 1,
              description: 1,
              sizes: 1,
              colors: 1,
              images: 1,
              reviewsCount: 1,
              averageRating: 1
            }
          },
          {
            $skip: (page - 1) * limit
          },
          {
            $limit: limit
          }
        ]
      }
    }
  ]);
}

module.exports = { createProduct, getProductById, getProducts };
