const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


loginRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
  
    const user = await User.findOne({ email: body.email });

    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);
    
    
    if (!(user && passwordCorrect)) {
      console.log("Wrong password-------------------------------");
      
      return await res.status(401).json({error: 'invalid email and password'});
    }
    
    console.log("Proceed Password right-------------------------------");
    const userForToken = {
      email: user.email,
      id: user._id,
    };
  
    const token = await jwt.sign(userForToken, config.SECRET);
    
    await res
      .status(200)
      .send({ name: user.name, email: user.email, token });

  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = loginRouter;
