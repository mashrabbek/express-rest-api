const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // throw new Error(
  //   "EEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRROOOOOOOOOOOOOOOORRRRRRRRRR"
  // );
  res.send("index");
});

module.exports = router;
