const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');
const productsRouter = require('./routes/products');
const mockUsers = require('./mocks/users');
const mockProducts = require('./mocks/products');
const { create } = require('./helpers');

create('users', mockUsers);
create('reviews', []);
create('products', mockProducts);

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);
app.listen(3000, () => console.log('Server Started'));
