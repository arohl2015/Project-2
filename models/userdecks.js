module.exports = function (sequelize, DataTypes) {
    var UserDecks = sequelize.define("UserDecks", {
 
    });

    UserDecks.associate = function(models){
        // Each UserEvent belongs to one User
        UserDecks.belongsTo(models.User, { onDelete: "cascade" });
        // and One Event
        UserDecks.belongsTo(models.Deck, { onDelete: "cascade" });
      }
    
      return UserDecks;
    }
