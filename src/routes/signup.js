const signupRouter = require('express').Router();

signupRouter.get('/', async (req, res) => {
  res.send('good morming Damilola');
});



module.exports = signupRouter;
