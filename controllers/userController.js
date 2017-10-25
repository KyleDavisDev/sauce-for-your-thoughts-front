const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");
const jwt = require("jsonwebtoken");

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
    .checkBody("confirmPassword", "Confirmed password cannot be empty.")
    .notEmpty();
  req
    .checkBody("confirmPassword", "Oops! Your passwords do not match.")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const registerWithPromise = promisify(User.register, User); //now register method can be awaited
  try {
    await registerWithPromise(user, req.body.password);
  } catch (err) {
    res.send(err);
  }
  next(); //go to authController.login
};

exports.getUser = (req, res, next) => {
  // check if a user exists
  return User.findById(req.body._id, (userErr, user) => {
    if (userErr || !user) {
      return res.status(401).end();
    }

    //only pass back relevant information
    const data = {
      isGood: true,
      user: { name: user.name, email: user.email, _id: user._id },
      msg: "Successfully found user."
    };
    return res.send(data);
  });
};

exports.updateUser = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  try {
    await User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: updates },
      { new: true, runValidators: true, context: "query" }
    );
    res.send({ message: "Success" });
  } catch (err) {
    res.send(err);
  }
};
