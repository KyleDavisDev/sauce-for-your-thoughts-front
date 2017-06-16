const express = require("express");
const router = express.Router();

//grab controllers
const storeController = require("../controllers/storeController.js");

router.get("/store", storeController.addStore);

// api stuff
router.get("/api/reverse/:first", (req, res) => {
  const reverse = req.params.first.split("").reverse().join("");
  res.send(reverse);
});

//let react handle rest
router.get("*", (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
