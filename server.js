const express = require('express');
const store = require('store2');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const reviewsRouter = require('./routes/reviews');
const mockProducts = require('./mocks/products');
const mockUsers = require('./mocks/users');
const app = express();

const products = store('products') || [];
if (products.length === 0) {
    store('products', mockProducts);
}

const users = store('users') || [];
if (users.length === 0) {
    store('users', mockUsers);
}

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);
app.listen(3000, () => console.log('Server Started'));
