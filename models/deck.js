module.exports = function (sequelize, DataTypes) {
    var Deck = sequelize.define("Deck", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Deck.associate = function (models) {
        Deck.belongsTo(models.User);
        Deck.hasMany(models.UserDecks, {
            onDelete: "cascade"
        })
        models.Deck.hasMany(models.Card, { onDelete: 'cascade' });
    }

    return Deck;
};