var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });
    //Grab all decks
    app.get("/api/decks", function (req, res) {
        db.Deck.findAll({}).then(function (dbDeck) {
            res.json(dbDeck);
        })
    })
    //Retrieve specific deck based off of click
    app.get("/api/decks/:id", function (req, res) {
        db.Deck.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        })
    })
    //Get the cards associated with deck ID (when clicking into deck)
    app.get("/api/cards/:deckID", function (req, res) {
        db.Cards.findAll({
            where: {
                deckID: req.params.deckId
            }
        }).then(function (cards) {
            res.json(cards);
        })
    })
    //This will allow us to determine who the deck is created by
    app.get("/api/decks/name", function (req, res) {
        db.Deck.findAll({
            include: [{
                model: db.User,
                attributes: ['username'],
                where: {
                    userId: db.Sequelize.col('User.id')
                }
            }],
        }).then(function (result) {
            res.json(result);
        })
    })
    //Add new deck 
    app.post("/api/new/deck"), function (req, res) {
        db.Deck.create({
            id: req.body.id,
            title: req.body.title,
            body: req.body.body
        }).then(function (result) {
            res.json(result);
        })
    }
    //Add new cards
    app.post("/api/new/card"), function (req, res) {
        db.Deck.create({
            id: req.body.id,
            front: req.body.front,
            back: req.body.back
        }).then(function (result) {
            res.json(result);
        })
    }
    // Update deck with corresponding ID (editting specific deck)
    app.put("/api/decks/update/:id", function (req, res) {
        db.Deck.update({
            title: req.body.title,
            body: req.body.body
        }, {
            where: {
                id: req.params.id
            }

        }).then(function () {
            res.json("Update")
        })
    })
    //Update card within deck based off of id
    app.put("/api/card/update/:id", function (req, res) {
        db.Card.update({
            front: req.body.front,
            back: req.body.back
        }, {
            where: {
                id: req.params.id
            }

        }).then(function () {
            res.json("Update")
        })
    })

    //delete from user decks (should this be a delete request to user decks instead of deck?)
    app.delete("/api/decks/delete/:id", function (req, res) {
        db.Deck.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });
    //Deletes the card from the corresponding deck (userdeck)
    app.delete("/api/card/delete/:id", function (req, res) {
        db.Card.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbCard) {
            res.json(dbCard);
        });
    });


    // user



    // deck  /api/deck
   // app.get()   /// all
   // app.get    // one  // url include an id
   // app.post
   // app.put      // url include an id
   // app.delete  // url is including an id


    // card  // post need the deckID (pass in the req.params and the body with the info of the card)
    // app.post("/api/card/:id)

    //userdeck  (post and delete) post("api/userdeck/:userId/:deckId)

    // app.get("/api/decks", function (req, res) {

    //     db.Deck.findAll({
    //         include: [db.category]
    //     }).then(function (dbDeck) {
    //         res.json(dbDeck);
    //     });
    // });

    // app.get("/api/decks/:id", function (req, res) {

    //     db.Deck.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.category]
    //     }).then(function (dbDeck) {
    //         res.json(dbDeck);
    //     });
    // });

    // app.post("/api/decks", function (req, res) {
        // add userId  (this is comming if using passprot req.user)y
        // console.log(req.user)
        // console.log(req.body)
        // let newDeck = req.body
        // newDeck.UserId = req.user.id
    //     db.Deck.create(newDeck).then(function (dbDeck) {
    //         res.json(dbDeck);
    //     });
    // });

    // app.delete("/api/decks/:id", function (req, res) {
    //     db.Deck.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (dbDeck) {
    //         res.json(dbDeck);
    //     });
    // });

};
