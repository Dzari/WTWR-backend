const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const HTTPERROR = 409;
const DEFAULT = 500;
const SUCCESS = 200;
const forbiddenMessage = "You are not authorized to perform this action";

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
  DEFAULT,
  SUCCESS,
  forbiddenMessage,
};
