const router = require("express").Router();

router.get("/", () => {
  console.log("got items");
});

router.post("/", (item) => {
  console.log("posted item: " + item);
});

router.delete("/:itemId", (item) => {
  console.log("deleted item: " + item);
});

module.exports = router;