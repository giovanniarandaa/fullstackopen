const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.slice(7);
    return next();
  }
  request.token = null;
  return next();
};

module.exports = {
  tokenExtractor,
};
