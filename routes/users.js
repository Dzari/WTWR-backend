const router = require("express").Router();

const { createUser, login } = require("../controllers/users");

router.use("/signin", login);
router.use("/signup", createUser);

module.exports = router;
