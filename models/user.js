module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The username cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUsername: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function (models) {
    models.User.hasMany(models.Deck, { onDelete: 'cascade' });
  };
}
