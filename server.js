// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");

// Requiring passport
var passport = require("./config/passport");
// this is the port we are setting up
var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
//For BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//Next, we initialize passport and the express session and passport session and add them both as middleware. We do this by adding these lines
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
