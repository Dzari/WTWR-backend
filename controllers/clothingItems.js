const Item = require("../models/clothingItem");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  Item.create({ name, weather, imageUrl, owner: _id})
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .then((item) => {
      if (item !== null) res.status(200).send(item);
      else throw Error(404);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      } else if (err.name === "Error") {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getItems, createItem, deleteItem };
