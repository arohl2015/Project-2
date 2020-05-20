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
        models.Deck.belongsTo(models.user);
        models.Deck.hasMany(models.userdecks, {
            onDelete: "cascade"
        })
        models.Deck.hasMany(models.card, { onDelete: 'cascade' });
    }

    return Deck;
};