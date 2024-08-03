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
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
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
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
