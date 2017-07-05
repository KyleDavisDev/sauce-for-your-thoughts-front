const mongoose = require("mongoose");

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

  console.log("We made it through!")
  next();
};
