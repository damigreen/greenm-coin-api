const fundRouter = require('express').Router();
const sendRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const Transaction = require('../models/transaction');


// Get token from request
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }

  return null;
}

fundRouter.post('/', async (req, res) => {
  const body = req.body;
  const amount = body.amount;
  if (!amount) {
    await res.status(401).send({ error: 'Please specify an amount to fund'});
  }

  // Get token
  const token = getTokenFrom(req);

  try {
    //Decode token
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken.id) {
      return await res.status(401).send({ error: 'Token missing or invalid' });
    }

    // Get logged in user
    const user = await User.findById(decodedToken.id);
    const userAccount = user.number;
    
    console.log(user);

    // New transaction
    const newFundTransaction = new Transaction({
      transactionType: "Account Fund",
      transactionAccount: userAccount,
      date: new Date(),
      amount: req.amount,
      user: user._id
    });

    // Update Balance
    const newBalance = amount + user.balance;
    user.balance = newBalance;

    // Save transaction to database
    const savedTransaction = await newFundTransaction.save();
    // Update transaction in users
    user.transactions = user.transactions.concat(savedTransaction._id);
    await user.save();
    await res.json(savedTransaction.toJSON());

  } catch (err) {
    console.log(err)
  }
});

sendRouter.get('/', async(req, res) => {
  res.send('Send fund to account number');
});


module.exports = {
  fundRouter,
  sendRouter,
}
