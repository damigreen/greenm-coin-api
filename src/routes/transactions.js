const creditRouter = require('express').Router();
const debitRouter = require('express').Router();
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

creditRouter.post('/', async (req, res) => {
  const body = req.body;
  const amount = body.amount;
  if (!amount) {
    await res.status(401).send({ error: 'Please specify an amount to credit'});
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
    
    // New transaction
    const newCreditTransaction = new Transaction({
      transactionType: "Account Credit",
      transactionAccount: userAccount,
      date: new Date(),
      amount: amount,
      user: user._id
    });

    // Update Balance
    const newBalance = amount + user.balance;
    // user.balance = newBalance;
    await User.findByIdAndUpdate(decodedToken.id, { balance: newBalance });

    // Save transaction to database
    const savedTransaction = await newCreditTransaction.save();
    // Update transaction in users
    user.transactions = user.transactions.concat(savedTransaction._id);
    await user.save();
    await res.json(savedTransaction.toJSON());

  } catch (err) {
    console.log(err)
  }

});

debitRouter.post('/', async(req, res) => {
  const body = req.body;
  const amount = body.amount;
  const accountToCredit = body.transactionAccount;

  if (!amount) {
    await res.status(401).send({ error: 'Please specify an amount to send'});
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

    
    // New debit transaction
    const newDebitTransaction = new Transaction({
      transactionType: "Account Debit",
      transactionAccount: accountToCredit,
      date: new Date(),
      amount: amount,
      user: user._id
    });
    
    // Update Balance
    const newBalance = user.balance - amount;
    user.balance = newBalance;

    // Update beneficiary account
    const userAccountToCredit = await User.findOne({ number: accountToCredit });
    if (userAccountToCredit) {
      const newAccBalance = userAccountToCredit.balance + amount;
      await User.findOneAndUpdate({ number: accountToCredit, balance: newAccBalance });
    }

    // Save transaction to database
    const savedTransaction = await newDebitTransaction.save();
    // Update transaction in users
    user.transactions = user.transactions.concat(savedTransaction._id);
    await user.save();
    await res.json(savedTransaction.toJSON());

  } catch (err) {
    console.log(err)
  }
});


module.exports = {
  creditRouter,
  debitRouter,
}
