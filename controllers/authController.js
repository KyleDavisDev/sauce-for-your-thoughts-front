const passport = require("passport");

exports.login = passport.authenticate("local", function(err, user) {
  if (req.xhr) {
    //thanks @jkevinburton
    if (err) {
      return res.json({ error: err.message });
    }
    if (!user) {
      return res.json({ error: "Invalid Login" });
    }
    req.login(user, {}, function(err) {
      if (err) {
        return res.json({ error: err });
      }
      return res.json({
        user: {
          id: req.user.id,
          email: req.user.email,
          joined: req.user.joined
        },
        success: true
      });
    });
  } else {
    if (err) {
      return res.redirect("/login");
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.login(user, {}, function(err) {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  }
});
