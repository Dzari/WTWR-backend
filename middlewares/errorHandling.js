const errorHandling = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  console.log(statusCode);

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occured on the server" : message,
  });
};

module.exports = { errorHandling };
