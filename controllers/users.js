const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { ConflictError } = require("../utils/errors/ConflictError");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError")
        next(new NotFoundError(err.message));

      if (err.name === "ValidationError")
        next(new BadRequestError(err.message));

      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError")
        next(new NotFoundError(err.message));

      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(err.message));
      }
      if (err.name === "ValidationError")
        next(new BadRequestError(err.message));

      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Incorrect password or email"));
  }

  User.findUserByCredentials(email, password)
    .then((data) => {
      const user = data;
      user.password = "";
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token, user });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password")
        next(new UnauthorizedError(err.message));

      next(err);
    });
};

module.exports = { updateUser, getCurrentUser, createUser, login };
