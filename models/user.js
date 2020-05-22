// we import bcrypt which we need to secure passwords.
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
      },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
       }
    }
  })

  User.associate = function (models) {
    models.User.hasMany(models.Deck, { onDelete: 'cascade' });
  };
  User.associate = function (models) {
    models.User.hasMany(models.userdecks, { onDelete: 'cascade' });
  };


};



