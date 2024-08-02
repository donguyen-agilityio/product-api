const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  colors: [
    {
      type: String,
      required: true
    }
  ],
  sizes: [
    {
      type: String,
      required: true
    }
  ]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
