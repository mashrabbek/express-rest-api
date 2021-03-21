const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(x);
  return res.send(x);
});

module.exports = router;
