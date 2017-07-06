const passport = require("passport");

exports.login = (req, res) => {
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.send(err) }
    if (!user) { return res.send("not a user") }

    // req / res held in closure
    req.logIn(user, function (err) {
      if (err) { return res.send(err) }
      return res.send(user);
    });

  })(req, res);
}

exports.logout = (req, res) => {
  req.logout();
}