require('dotenv').config();

let MONGO_URI = process.env.MONGO_URI;
let PORT = process.env.PORT;
console.log(PORT);

module.exports = {
  MONGO_URI,
  PORT,
}
