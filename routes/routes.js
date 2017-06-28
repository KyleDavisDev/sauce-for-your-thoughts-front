const express = require("express");
const router = express.Router();

//grab controllers
const storeController = require("../controllers/storeController.js");

router.post(
  "/api/store/add",
  storeController.upload,
  storeController.resize,
  storeController.stringToProperType,
  storeController.addStore
);
router.get("/api/store/:slug", storeController.getStoreBySlug)
router.get("/api/store/:id/get", storeController.getStoreById);
router.post("/api/store/:id/edit", storeController.editStore);

router.get("/api/stores/get", storeController.getStores);

//let react handle rest
router.get("*", (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
