const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED, UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError(err.message));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
