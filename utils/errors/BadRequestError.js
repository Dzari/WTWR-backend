const SUCCESS = 200;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequestError,
  SUCCESS,
};
