const router = require("express").Router();

router.get("/", () => {
  console.log("got users");
});

router.get("/:userId", (id) => {
  console.log("got user " + id);
});

router.post("/", (user) => {
  console.log("user: " + user);
});

module.exports = router;
