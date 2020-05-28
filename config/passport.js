//Referencing this website: https://jonathas.com/token-based-authentication-in-nodejs-with-passport-jwt-and-bcrypt/
var passport = require("passport");
var jwt = require("jwt-simple");
var moment = require("moment");
var passportJwt = require("passport-jwt");
var LocalStrategy = require("passport-local").Strategy;

const SECRET = "sean-bak";

// We're going to save anything related to passport configuration to this variable
// which is going to be exported in the end (to be consumed by other files)
var passportConfig = {};

var db = require("../models");


// Initializing passport as JWT strategy within Express
passportConfig.initialize = () => {
  passport.use("jwt", jwtStrategy());
  return passport.initialize();
}


// Receives a User object and uses JWT library to calculate token
// for the given user based on the configs provided (expirationTime, custom salt SECRET

// custom salt SECRET: whenever you're using crypto hashes, you want to add some specific custom noise
// that only your app know about, so even if someone else hashes the exact same value, they're not going to
// be able to revert because your unique custom hash is making sure that values are different

passportConfig.genToken = (user) => {
  const expires = moment().utc().add({ days: 7 }).unix();

  // Whatever we pass to jwt.encode function is the payload that will be later
  // decoded and available to the jwtStrategy
  // In this case, our payload is this:
  /*
  {
    exp: expires,
    username: user.email,
  }
  */
  const token = jwt.encode({
    exp: expires,
    username: user.email
  }, SECRET || process.env.JWT_SECRET);

  return {
    token: "JWT " + token,
    expires: moment.unix(expires).format(),
    user: user.id
  };
}


// just a shortcut configuration with passport.authenticate as jwt by default that is going to be used on the middleware
passportConfig.authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

// Setup of the JWT strategy: we are receiving the decoded
// payload as params from passport, and checking the User
// for the given payload.username, if the user is actually found
// we're returning that User in order to be used inside the middleware later
//
const jwtStrategy = () => {
  const params = {
    secretOrKey: SECRET || process.env.JWT_SECRET,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    passReqToCallback: true
  };

  return new passportJwt.Strategy(
    params,
    function (req, payload, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        attributes: ['email'],
        where: {
          email: payload.username,
        },
        logging: console.log
      }).then(function (dbUser) {


        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        /* else if (!dbUser.validPassword(password, dbUser.dataValues.password)) {
           console.log(dbUser.validPassword(password, dbUser.dataValues.password));
           return done(null, false, {
             message: "Incorrect password."
           });
         }*/
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
}

//after speaking with the team, decided to use email over a username
//passport.use('jwt', jwtStrategy);
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport file
module.exports = passportConfig;
