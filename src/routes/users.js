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

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  console.log(body)

  const user = new User({
    name: body.name,
    email: body.email,
    number: body.number,
  });

  if (!user) {
    throw new Error({error: 'invalid request'});
  }

  try {
    await user.save().then(newUser => {
      res.send(user.toJSON());
    })
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});


module.exports = usersRouter;
