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
    const createdProduct = await createProduct(req.body);
    const product = await getProductById(createdProduct.id);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const settings = await getProductsSettings();

    res.status(200).json(settings);
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
    const data = await getProducts(req.query);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
