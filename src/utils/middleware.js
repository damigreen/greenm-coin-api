const requestLogger = (request, response, next) => {
  console.info(`Method: ${request.path}`);
  console.info(`Path: ${request.path}`);
  console.info(`Body: ${request.body}`);
  console.info('----');
  next();
};

const redirectHome = ('/login', async (req, res, next) => {
  res.redirect('/');
  next();
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformated ID'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json(error.message);
  } else if (error.name === 'jsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token'});
  }

  console.error(error.message);
  next(error);
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint'});
} 

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  redirectHome
}
