// code below is from from dev.to - we are not using handlebars
// our team decided to use email vs username which is the passport.js default
//we import bcrypt which we need to secure passwords.
var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The username cannot be null
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }


  });

  // we need to create a custom method for our User model. 
  //This checks an unhashed password entered by the user and compares it to the hashed password stored in our database
  User.prototype.validPassword = function (password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password

  User.addHook("beforeCreate", function (user, options) {
    console.log("This is the user password " + JSON.stringify(user), user, options);
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });


  User.associate = function (models) {
    User.hasMany(models.Deck, { onDelete: 'cascade' });
  };
  User.associate = function (models) {
    User.hasMany(models.UserDecks, { onDelete: 'cascade' });
  };

  return User;
};

