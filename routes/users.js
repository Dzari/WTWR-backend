const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const {
  validateUserLogin,
  validateUserBody,
  validateUserUpdate,
} = require("../middlewares/validation");

router.use("/login", validateUserLogin, login);
router.use("/signup", validateUserBody, createUser);
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, validateUserUpdate, updateUser);

module.exports = router;
