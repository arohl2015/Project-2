// most of the below code was provided completely by passport.js documentation
//on using local storage for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require();

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  }
));

//Need to export the passport configurations
module.exports = passport;