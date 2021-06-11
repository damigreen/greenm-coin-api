const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const signupRouter = require('./routes/signup');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defined Routes
app.use('/api/signup', signupRouter);

module.exports = app;
