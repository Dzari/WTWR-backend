const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const likeRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/items/:itemId", likeRouter);

module.exports = router;
