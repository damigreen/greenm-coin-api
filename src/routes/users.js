const usersRouter = require('express').Router();
const { find, findById, findByIdAndUpdate } = require('../models/user');
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
    res.sendStatus(404).end();
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

usersRouter.put('/:id', async (req, res) => {
  id = req.params.id;
  body = req.body;

  try {
    const update = {
      name: body.name,
      email: body.email,
      number: body.number,
    }
  
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    await res.json(updatedUser.toJSON());

  } catch (e) {
    console.log(e)
    await res.sendStatus(404).end();
  }
})


module.exports = usersRouter;
