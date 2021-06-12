const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const {
  creditRouter,
  debitRouter,
} = require('./routes/transactions');
// const fundRouter = require('./routes/transactions');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defined Routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/transactions/credit', creditRouter);
app.use('/api/transactions/debit', debitRouter);

module.exports = app;
