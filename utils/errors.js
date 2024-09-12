const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const HTTPERROR = 409;
const DEFAULT = 500;
const SUCCESS = 200;
const forbiddenMessage = "You are not authorized to perform this action";

module.exports = {
  NOT_FOUND,
  UNAUTHORIZED,
  HTTPERROR,
  BAD_REQUEST,
  FORBIDDEN,
  DEFAULT,
  SUCCESS,
  forbiddenMessage,
};
