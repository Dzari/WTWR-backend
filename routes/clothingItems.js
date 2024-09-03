const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItems,
  deleteLikes,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", likeItems);

router.delete("/:itemId/likes", deleteLikes);

module.exports = router;
