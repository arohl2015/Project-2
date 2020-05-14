var db = require("../models");

module.exports = function (app) {
    app.get("/api/decks", function (req, res) {

        db.Deck.findAll({
            include: [db.category]
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });

    app.get("/api/decks/:id", function (req, res) {

        db.Deck.findOne({
            where: {
                id: req.params.id
            },
            include: [db.category]
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });

    app.post("/api/decks", function (req, res) {
        db.Deck.create(req.body).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });

    app.delete("/api/decks/:id", function (req, res) {
        db.Deck.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });

};
