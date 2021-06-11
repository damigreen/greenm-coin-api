const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defined Routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
