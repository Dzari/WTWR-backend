const Item = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  SUCCESS,
  FORBIDDEN,
  forbiddenMessage,
} = require("../utils/errors");

const errorHandling = (err, res) => {
  if (err.name === "ReferenceError") {
    return res.status(FORBIDDEN).send({ message: forbiddenMessage });
  }
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

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch(() => {
      res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  Item.create({ name, weather, imageUrl, owner: _id })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        res.status(FORBIDDEN).send({ message: forbiddenMessage });
        return;
      }
      item
        .deleteOne()
        .then(() => res.send({ message: "Successfully deleted" }));
    })
    .catch((err) => errorHandling(err, res));
};

const likeItems = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => errorHandling(err, res));
};

const deleteLikes = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => errorHandling(err, res));
};

module.exports = { getItems, createItem, deleteItem, likeItems, deleteLikes };
