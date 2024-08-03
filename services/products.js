const mongoose = require('mongoose');
const Product = require('../models/product');

function createProduct({ category, colors, description, images, name, price, sizes, type }) {
  return Product.create({
    category,
    colors,
    description,
    images,
    name,
    price,
    sizes,
    type
  });
}

function getProductById(productId) {
  return Product.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId.createFromHexString(productId) }
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
        reviewsCount: { $size: '$reviews' },
        averageRating: { $ifNull: [{ $avg: '$reviews.rating' }, 0] }
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
        createdAt: 1,
        reviewsCount: 1,
        averageRating: 1
      }
    }
  ]);
}

function getProducts({ limit = 5, maxPrice = 0, minPrice = 0, page = 1, type }) {
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
              averageRating: { $ifNull: [{ $avg: '$reviews.rating' }, 0] }
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
              createdAt: 1,
              reviewsCount: 1,
              averageRating: 1
            }
          },
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ]
      }
    }
  ]);
}

function getProductsSettings() {
  return Product.aggregate([
    {
      $facet: {
        colors: [
          { $unwind: '$colors' },
          { $group: { _id: null, colors: { $addToSet: '$colors' } } },
          { $project: { _id: 0, colors: 1 } }
        ],
        types: [
          { $group: { _id: '$type', count: { $sum: 1 } } },
          { $project: { _id: 0, type: '$_id', count: 1 } }
        ],
        maxPrice: [
          { $group: { _id: null, maxPrice: { $max: '$price' } } },
          { $project: { _id: 0, maxPrice: 1 } }
        ]
      }
    },
    {
      $project: {
        types: '$types',
        colors: { $ifNull: [{ $arrayElemAt: ['$colors.colors', 0] }, []] },
        maxPrice: { $ifNull: [{ $arrayElemAt: ['$maxPrice.maxPrice', 0] }, 0] }
      }
    }
  ]);
}

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  getProductsSettings
};
