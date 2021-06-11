const app = require('./app');
const mongoose = require('mongoose');
const config = require('./utils/config')
const mongoUrl = config.MONGO_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));


const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/* 
* Todo
Create logic for handling users
  Create user
  delete user
  Get user
  update user
*/