const express = require("express");
const router = express.Router();

//grab controllers
const storeController = require("../controllers/storeController.js");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

//APIs here -----

//Store(s)
//upload must be called first for post that are "multipart/form-data"
//multer will put data object onto req.body like normal

//1. Check mimetype of image and set req.body
//2. Verify if user is valid
//3. Resize image and write to server
//4. Conver req.body data to be proper format for DB
//5. Write to DB
router.post(
  "/api/store/add",
  storeController.upload,
  authController.isLoggedIn,
  storeController.resize,
  storeController.stringToProperType,
  storeController.addStore
);
router.get("/api/store/:slug", storeController.getStoreBySlug);
router.get("/api/store/:id/get", storeController.getStoreById);

//See API for adding store
router.post(
  "/api/store/:id/edit",
  storeController.upload,
  authController.isLoggedIn,
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
  userController.register,
  authController.login
);
router.post("/login", authController.login);
router.post("/account/get", userController.getUser);
router.post("/account/update", userController.updateUser);
router.post("/account/forgot", authController.forgot);
router.post("/account/validateResetToken", authController.validateResetToken);
router.post(
  "/account/reset",
  authController.confirmPasswords,
  authController.updatePassword,
  authController.login
);

//END API ---

//let react handle rest
router.get("*", (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
