const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  SUCCESS,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const errorHandling = (err) => {
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occurred on the server" });
};

const updateUser = (req, res) => {
  const { _id, name, avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
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

const getCurrentUser = (req, res) => {
  User.findById({ _id: req.user._id })
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch(errorHandling(err));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => res.status(SUCCESS).send(user))
    .catch(errorHandling(err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(SUCCESS).send(token);
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = { updateUser, getCurrentUser, createUser, login };
