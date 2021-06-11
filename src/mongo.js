const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('./utils/config')
const url = config.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  number: { type: String, require: true },
});
// userSchema.plugin(uniqueValidator);

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   }
// });


const User = mongoose.model('User', userSchema);



try {
  // const user = new User({
  //   name: 'Damilola Faseun',
  //   email: 'fashfired@gmail.com',
  //   number: '09017755801',
  // });


  // user.save().then((result) => {
  //   console.log('user saved');
  //   mongoose.connection.close()
  // });

  // const users = [
  //   {
  //     name: 'Johny King',
  //     email: 'johnyking@gmail.com',
  //     number: '09010939801',
  //   },
  //   {
  //     name: 'Yemi Flash',
  //     email: 'yemiflash@gmail.com',
  //     number: '09010939038',
  //   },
  //   {
  //     name: 'Bruce Banners',
  //     email: 'brucebanners@gmail.com',
  //     number: '09013889801',
  //   },
  // ]

  // User.insertMany(users, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(result);
  //   }
  // });

  
} catch (e) {
  console.log(e);
}
