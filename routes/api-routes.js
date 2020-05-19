var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

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

    app.category("/api/decks", function (req, res) {
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
