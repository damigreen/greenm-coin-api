const usersRouter = require('express').Router();
const { find, findById, findByIdAndUpdate } = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcrypt');


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
  const saltRounds = 10;
  
  try {
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    console.log(passwordHash);

    const user = new User({
      name: body.name,
      email: body.email,
      number: body.number,
      balance: 5000,
      passwordHash,
    });

    const newUser = await user.save();
    await res.send(newUser);

  } catch (e) {
    console.log(e);
    await res.send(e);
  }
});

usersRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = bcrypt.hash(body.password, saltRounds);

  try {
    const update = {
      name: body.name,
      email: body.email,
      number: body.number,
      balance: body.balance,
      passwordHash: passwordHash
    }
  
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    await res.json(updatedUser.toJSON());

  } catch (e) {
    console.log(e)
    await res.sendStatus(404).end();
  }
});

usersRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.sendStatus(204).end();
});


module.exports = usersRouter;
