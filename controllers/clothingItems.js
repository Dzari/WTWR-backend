const Item = require("../models/clothingItem");
const { BadRequestError, SUCCESS } = require("../utils/errors/BadRequestError");
const { ForbiddenError } = require("../utils/errors/ForbiddenError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  Item.create({ name, weather, imageUrl, owner: _id })
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      next();
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new ForbiddenError(err.message));
      }
      item
        .deleteOne()
        .then(() => res.send({ message: "Successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      }
      next();
    });
};

const likeItems = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      }
      next();
    });
};

const deleteLikes = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      }
      next();
    });
};

module.exports = { getItems, createItem, deleteItem, likeItems, deleteLikes };
