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

async function getProductById(productId) {
  const result = await Product.aggregate([
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
        _id: 0,
        id: '$_id',
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

  return result[0];
}

async function getProducts({ limit = 5, maxPrice = 0, minPrice = 0, page = 1, type, color }) {
  const matchStage = {};

  if (type) {
    matchStage.type = type;
  }

  if (color) {
    matchStage.colors = color;
  }

  if (maxPrice) {
    matchStage.price = { $gte: minPrice, $lte: maxPrice };
  }

  const result = await Product.aggregate([
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
              _id: 0,
              id: '$_id',
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

  const products = result[0].products;
  const totalCount = result[0].totalCount[0] || { count: 0 };
  const count = totalCount.count;

  return {
    products,
    count
  };
}

async function getProductsSettings() {
  const result = await Product.aggregate([
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

  return result[0];
}

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  getProductsSettings
};
