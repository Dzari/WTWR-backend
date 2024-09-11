const router = require("express").Router();

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.use("/signin", login);
router.use("/signup", createUser);
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateUser);

module.exports = router;
