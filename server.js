require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const reviewsRouter = require('./routes/reviews');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', error => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to Database'));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  })
);

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);

app.listen(3000, () => console.log('Server Started'));
