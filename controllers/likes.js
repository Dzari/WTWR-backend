const Item = require("../models/clothingItem");

const likeItems = () => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.log(err.name);
    });
};

const deleteLikes = () => {
  Item.findByIdAndDelete(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => console.log(err.name));
};

module.exports = { likeItems, deleteLikes };
