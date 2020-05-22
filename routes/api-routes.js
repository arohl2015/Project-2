//giving credit to dev.to for developing the code for our passport.js to work correctly
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy
    // we want to make sure the user with valid login credentials gets sent to the right page
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json("/account");
    });
    // Route for signing up a user.
    // if the user is created successfully, proceed to log the user in or send back an error
    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
        });
    });
    // Route that is used to log the user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.User) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Send back the user's email and id
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
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
        })

            .then(function (dbDeck) {
                res.json(dbDeck);
            })
    })
    //Get the cards associated with deck ID (when clicking into deck)
    app.get("/api/cards/:DeckId", function (req, res) {
        db.Card.findAll({
            where: {
                DeckId: req.params.DeckId
            },

        }).then(function (cards) {
            res.json(cards);
        })
    })
    //This will allow us to determine who the deck is created by
    app.get("/api/decks/name/:id", function (req, res) {
        db.Deck.findAll({


            include: [{
                model: db.User,
                attributes: ['email'],
                where: {
                    userId: db.Sequelize.col('User.id'),
                    DeckId: req.params.id
                }
            }],
        }).then(function (result) {
            res.json(result);
        })
    })
    //Add new deck 
    app.post("/api/new/deck", function (req, res) {
        console.log("req.body", req.body)
        db.Deck.create(
            {
                title: req.body.title,
                body: req.body.body,
                id: req.body.id
            }
        ).then(function (result) {
            console.log(result.id);
            db.Card.create({
                front: req.body.front,
                back: req.body.back,
                DeckId: result.id
            }).then(function (result) {
                res.json(result);
            })


        })
    })
    //Add new cards
    app.post("/api/new/card", function (req, res) {
        console.log("req.body", req.body)
        db.Card.create({

            front: req.body.front,
            back: req.body.back,
            DeckId: req.body.DeckId

        }).then(function (result) {
            res.json(result);
        })
    }
    )
    app.post("/api/decks", function (req, res) {
        db.Deck.create(req.body).then(function (dbDeck) {
            res.json(dbDeck);
        })
            .then(function () {
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
    app.delete("/api/decks/decks/:id", function (req, res) {
        db.Deck.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });
    //Deletes the card from the corresponding deck (userdeck)
    app.delete("/api/card/decks/:id", function (req, res) {
        db.Card.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbCard) {
            res.json(dbCard);
        });
    });



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

    // app.category("/api/decks", function (req, res) {
    //     db.Deck.create(req.body).then(function (dbDeck) {
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

}
