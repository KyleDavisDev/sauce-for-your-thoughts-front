const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name.").notEmpty();
  req.checkBody("email", "That email is not valid.").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password cannot be empty.").notEmpty();
  req
    .checkBody("confirm-password", "Confirmed password cannot be empty.")
    .notEmpty();
  req
    .checkBody("confirm-password", "Oops! Your passwords do not match.")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const registerWithPromise = promisify(User.register, User); //not register method can be awaited
  try {
    await registerWithPromise(user, req.body.password);
    res.send("it works!");
  } catch(err) {
    res.send(err)
  }
  next(); //go to authController.login
};
