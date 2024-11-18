const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.slice(7);
    return next();
  }
  request.token = null;
  return next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    request.user = null;
    return next({ name: "JsonWebTokenError" });
  }

  request.user = decodedToken;
  return next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
