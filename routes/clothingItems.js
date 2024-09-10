const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItems,
  deleteLikes,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", auth, createItem);

router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likeItems);

router.delete("/:itemId/likes", auth, deleteLikes);

module.exports = router;
