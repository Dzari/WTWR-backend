const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => console.error(err));
};

const getUserbyId = (req, res) => {
  console.log("placeholder");
};

const createUser = (req, res) => {
  console.log("created user");
};

module.exports = { getUsers, getUserbyId, createUser };
