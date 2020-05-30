// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");

// Requiring passport
var passport = require("./config/passport");
// this is the port we are setting up
var PORT = process.env.PORT || 8080;
var db = require("./models");
var passportConfig = require("./config/passport")
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//Next, we initialize passport and the express session and passport session and add them both as middleware. We do this by adding these lines
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


app.use(passportConfig.initialize());

// The middleware is usually a shared logic that is going to be present
// on several pages, so it can be easilly reused by Express
// The authMiddleware skips pages where no auth should be mandatory on its first two lines
// After that, we're using passportConfig.authenticate from passportConfig file in order to
// to obtain the given User object from the jwtStrategy and if we don't receive a valid user
// we're returning a 401 Unauthorized and preventing the user to access the given routes.
// If it's a valid user, we just call next() and allow the routes chain execution to continue
const authMiddleware = (req, res, next) => {
  if (req.path.includes('/api/' + "login")) return next();
  if (req.path.includes('/api/' + "signup")) return next();

  return passportConfig.authenticate((err, user, info) => {
    console.log(err, user, info)

    if (err) { return next(err); }
    if (!user) {
      if (info.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
      } else {
        return res.status(401).json({ message: info.message });
      }
    }
    app.set("user", user);
    return next();
  })(req, res, next);
}

app.all("/api/*", authMiddleware);


// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
