const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


loginRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
  
    const user = await User.findOne({ email: body.email });
    console.log(user.passwordHash);
    console.log(body.password);

    passwordCorrect = user === null ? false : await bcrypt.compare(user.passwordHash, body.password);
  
    if (!(user && passwordCorrect)) {
      return res.sendStatus(401).json({ error: 'invalid email or password'});
    }
  
    const userForToken = {
      email: user.email,
      id: user._id,
    };
  
    const token = jwt.sign(userForToken, config.SECRET);
    await res.sendStatus(200).send(token, { name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = loginRouter;
