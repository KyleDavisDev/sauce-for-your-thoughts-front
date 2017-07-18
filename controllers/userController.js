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
  } catch (err) {
    res.send(err);
  }
  next(); //go to authController.login
};

exports.getUser = (req, res, next) => {
  if (!req.body.token) {
    return res.status(401).end();
  }

  // get token from post
  const token = req.body.token;

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      //only pass back relevant information
      const data = { name: user.name, email: user.email, _id: user._id };
      res.send(data);
    });
  });
};

exports.updateUser = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };
  // console.log(updates);

  try {
    await User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: updates },
      { new: true, runValidators: true, context: "query" }
    );
    res.send({message: "Success"});
  } catch (err) {
    res.send(err);
  }
};
