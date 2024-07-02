const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.listen(1234, () => console.log('Server Started'));
