const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    await res.json(users.map(user => user.toJSON()));

  } catch (e) {
    console.log(e)
    await res.send(e);
  }
});


module.exports = usersRouter;
