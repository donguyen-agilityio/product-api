const express = require('express');
const {
  createProduct,
  getProductById,
  getProducts,
  getProductsSettings
} = require('../services/products');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const result = await getProductsSettings();

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getProducts(req.query);

    const products = result[0].products;
    const totalCount = result[0].totalCount[0] || { count: 0 };
    const count = totalCount.count;

    res.status(200).json({
      products,
      count: count
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
