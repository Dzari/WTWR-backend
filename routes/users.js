const { getUsers, getUserbyId, createUser } = require("../controllers/users");

const router = require("express").Router();

router.get("/", getUsers);

router.get("/:userId", getUserbyId);

router.post("/", createUser);

module.exports = router;
