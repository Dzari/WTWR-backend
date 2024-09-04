const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, DEFAULT, SUCCESS } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => {
      res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, getUser, createUser };
