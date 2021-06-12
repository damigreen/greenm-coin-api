const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('./utils/config')
const url = config.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  number: { type: String, require: true, unique: true },
  balance: { type: Number },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});


const User = mongoose.model('User', userSchema);



try {  
  const users = [
    {
      name: 'Damilola Faseun',
      email: 'fashfired@gmail.com',
      number: '09017755801',
      password: 'password'
    },
    {
      name: 'Johny King',
      email: 'johnyking@gmail.com',
      number: '09010939801',
      password: 'password'
    },
    {
      name: 'Yemi Flash',
      email: 'yemiflash@gmail.com',
      number: '09010939038',
      password: 'password'
    },
    {
      name: 'Bruce Banners',
      email: 'brucebanners@gmail.com',
      number: '09013889801',
      password: 'password'
    },
  ]
  
  User.insertMany(users, (err, result) => {
    if (err) {
      console.log(err);
      // mongoose.connection.close()
    } else {
      console.log(result);
    }
  });

  
} catch (e) {
  console.log(e);
}
