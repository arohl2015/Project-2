module.exports = function (sequelize, DataTypes) {
    var UserDecks = sequelize.define("UserDecks", {
 
    });

    UserDecks.associate = function(models){
        // Each UserEvent belongs to one User
        models.UserDecks.belongsTo(models.user, { onDelete: "cascade" });
        // and One Event
        models.UserDecks.belongsTo(models.deck, { onDelete: "cascade" });
      }
    
      return UserDecks;
    }
