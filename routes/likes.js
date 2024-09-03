const { likeItems, deleteLikes } = require("../controllers/likes");
const router = require("express").Router();

router.post("/likes", likeItems);

router.delete("/likes", deleteLikes);

module.exports = router;
