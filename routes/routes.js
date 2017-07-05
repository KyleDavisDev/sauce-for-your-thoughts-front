const express = require("express");
const router = express.Router();

//grab controllers
const storeController = require("../controllers/storeController.js");
const userController = require("../controllers/userController.js");

//APIs here -----
//Store(s)
router.post(
  "/api/store/add",
  storeController.upload,
  storeController.resize,
  storeController.stringToProperType,
  storeController.addStore
);
router.get("/api/store/:slug", storeController.getStoreBySlug);
router.get("/api/store/:id/get", storeController.getStoreById);
router.post(
  "/api/store/:id/edit",
  storeController.upload,
  storeController.resize,
  storeController.stringToProperType,
  storeController.editStore
);
router.get("/api/stores/get", storeController.getStores);

//Tag(s)
router.get("/api/tags/:tag/get", storeController.getStoreByTag);

//User(s)
//1. Validate the data
//2. register the user
//3. Log user in
router.post(
  "/register",
  userController.validateRegister,
  userController.register
);

//END API ---

//let react handle rest
router.get("*", (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
