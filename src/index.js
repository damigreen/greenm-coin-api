const app = require('./app');
const mongoose = require('mongoose');
const config = require('./utils/config')
const mongoUrl = config.MONGO_URI || MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));


const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
