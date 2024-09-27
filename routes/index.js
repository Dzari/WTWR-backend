const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NotFoundError } = require("../utils/errors/NotFoundError");

router.use("/", userRouter);
router.use("/items", itemRouter);
router.use(() => {
  throw new NotFoundError("Requested resourse not found");
});

module.exports = router;
