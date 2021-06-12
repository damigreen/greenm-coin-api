const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  transactionType: { type: String },
  transactionAccount: { type: String },
  date: { type: Date },
  amount: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
