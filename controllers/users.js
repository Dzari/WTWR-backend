const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { JWT_SECRET } = require("../utils/config");

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatarUrl } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatarUrl },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, avatarUrl, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatarUrl, email, password: hash }))
    .then((user) => {
      res.send({
        name: user.name,
        avatar: user.avatarUrl,
        email: user.email,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError(err.message));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token, user });
    })
    .catch(next);
};

module.exports = { updateUser, getCurrentUser, createUser, login };
