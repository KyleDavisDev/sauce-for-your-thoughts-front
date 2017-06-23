const express = require("express");
const router = express.Router();

//grab controllers
const storeController = require("../controllers/storeController.js");

router.post("/api/store/add", storeController.addStore);
router.get("/api/store/:id/get", storeController.getStore)
router.post("/api/store/:id/edit", storeController.editStore)

router.get("/api/stores/get", storeController.getStores)


//let react handle rest
router.get("*", (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
