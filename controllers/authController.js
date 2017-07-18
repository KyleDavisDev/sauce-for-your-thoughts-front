const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");

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
    const data = { token };
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
    user.resetPasswordExpires = new Date().getTime().toString();
    await user.save();

    //create URL link to email to person
    const resetURL = `https://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    const data = { resetURL };

    //send back URL
    return res.send(data);
  } catch (err) {
    res.send(err);
  }
};
