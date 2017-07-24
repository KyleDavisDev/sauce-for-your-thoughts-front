const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");
const promisify = require("es6-promisify");

exports.login = (req, res) => {
  // generate the authenticate method and pass the req/res
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.send("Invalid email or password");
    }

    if (err) {
      return res.send(err);
    }

    const payload = {
      sub: user._id
    };

    //create a token string
    const token = jwt.sign(payload, process.env.SECRET);
    const data = { isGood: true, msg: "Successfully logged in.", token };
    //send back token
    return res.send(data);
  })(req, res);
};

exports.isLoggedIn = (req, res, next) => {
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

      //user is legit
      return next();
    });
  });
};

exports.forgot = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.send("An email has been sent to you.");

    //create a token string
    const payload = {
      sub: user._id
    };
    const token = jwt.sign(payload, process.env.SECRET);

    //assign token and current date in DB to check against later
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    //create URL link to email to person
    const resetURL = `http://localhost:8080/account/reset/${user.resetPasswordToken}`;
    const data = { resetURL };

    //send back URL
    return res.send(data);
  } catch (err) {
    res.send(err);
  }
};

//called to verify if token is legit or not when user first lands on reset page
exports.validateResetToken = async (req, res) => {
  try {
    //find if user exists w/ matching token and within time limit of 1hr
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      const data = {
        isGood: false,
        msg: "Password reset token has expired or is incorrect."
      };
      res.send(data);
      return;
    }

    const data = { isGood: true, msg: "Please enter a new password." };
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

//checks if two submitted passwords are equal
exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    next(); //keep going
    return;
  }

  //passwords didn't match
  const data = {
    isGood: false,
    msg: "Passwords did not match. Please try again."
  };
  res.send(data);
  return;
};

//reset password
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.send({
        isGood: false,
        msg: "User was not found or token has expired."
      });
      return;
    }

    //save pw
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);

    //remove token and token expiration from db
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    //log user in -- need to bind email to req.body first
    req.body.email = user.email;
    next();
    return;
  } catch (err) {
    res.send(err);
    return;
  }
};
