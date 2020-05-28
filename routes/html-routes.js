var path = require("path");
// Requiring the custom middleware created for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    console.log(req.user);
    // if (!req.user) {
    //   res.redirect("/login");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //
  app.get("/login", function (req, res) {
    
    // if (!req.user) {
    //   res.redirect("/login");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  //
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // app.get("/", isAuthenticated, function (req, res) {
  //   if(req.user) {
  //   res.sendFile(path.join(__dirname, "../public/deck.html"));
  //   }
  // });

  app.get("/card",   function (req, res) {
    res.sendFile(path.join(__dirname, "../public/card.html"));
  });

  app.get("/cards",  function (req, res) {
    res.sendFile(path.join(__dirname, "../public/cards.html"));
  });

  app.get("/deck", function (req, res) {
    console.log('deck route')
    res.sendFile(path.join(__dirname, "../public/deck.html"));
  });

  app.get("/newdeck", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/newdeck.html"));
  });

  app.get("/account", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });

};