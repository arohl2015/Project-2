//creating a middleware folder with a isAuthenticated.js file
//was a recommendation from dev.to when using localstorage passport.js
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.User) {
      
      //Action: Put in logic here
      //Check DB against User ID
      return next();
    }
    // If the user isn't' logged in, redirect them to the login page
    return res.redirect("/");
  };