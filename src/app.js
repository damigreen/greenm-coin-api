const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const {
  creditRouter,
  debitRouter,
  transactionRouter,
} = require('./routes/transactions');
const middleware = require('./utils/middleware');


// Body parser middleware
app.use(cors());
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

// Defined Routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/transactions/credit', creditRouter);
app.use('/api/transactions/debit', debitRouter);
app.use('/api/transactions', transactionRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
