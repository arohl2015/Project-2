module.exports = function (sequelize, DataTypes) {
    var UserDecks = sequelize.define("UserDecks", {
 
    });
    //This is the many to many relationship broken out into a multi-valued dependency
    //A user has many decks and a deck has many users
    UserDecks.associate = function(models){
        // Each UserEvent belongs to one User
        UserDecks.belongsTo(models.User, { onDelete: "cascade" });
        // and One Event
        UserDecks.belongsTo(models.Deck, { onDelete: "cascade" });
      }
      
      return UserDecks;
    }
