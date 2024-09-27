const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItems,
  deleteLikes,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getItems);

router.post("/", auth, validateCardBody, createItem);

router.delete("/:itemId", auth, validateId, deleteItem);

router.put("/:itemId/likes", auth, validateId, likeItems);

router.delete("/:itemId/likes", auth, validateId, deleteLikes);

module.exports = router;
