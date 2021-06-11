const usersRouter = require('express').Router();
const { find, findById } = require('../models/user');
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

usersRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    await res.send(user.toJSON());
  } catch (e) {
    console.log(e);
    res.send(404)
  }
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = new User({
    name: body.name,
    email: body.email,
    number: body.number,
  });


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
