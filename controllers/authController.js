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
      return res.send("not a user");
    }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) {
        return res.send(err);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, process.env.SECRET);
      const data = {
        name: user.name,
        token
      };
      return res.send(data);
    });
  })(req, res);
};

exports.logout = (req, res) => {
  req.logout();
};

exports.isLoggedIn = (req, res, next) => {
  if (!req.body.token) {
    console.log("inside if");
    return res.status(401).end();
  }

  // get token from post
  const token = req.body.token;

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      console.log("there was an error");
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
