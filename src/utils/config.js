require('dotenv').config();

let MONGO_URI = process.env.MONGO_URI;
let PORT = process.env.PORT;
const SECRET = process.env.SECRET;

module.exports = {
  MONGO_URI,
  PORT,
  SECRET,
}
