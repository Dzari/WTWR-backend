const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { getCurrentUser } = require("../controllers/users");

router.use("/", userRouter);
router.use("/items", itemRouter);
router.use("/users/me", getCurrentUser);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resourse not found" });
});

module.exports = router;
