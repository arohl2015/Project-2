//Creating a card model using the Sequelize ORM
const Deck = require("./deck")
module.exports = function (sequelize, DataTypes) {
    var Card = sequelize.define("Card", {
        front: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        back: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    //The parent of a card is it's respective deck
    Card.associate = function (models) {
        Card.belongsTo(models.Deck);
    }

    return Card;
};