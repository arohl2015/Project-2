
var db = require("../models");
var passport = require("../config/passport");
var dbs = require("../config/dbs")
module.exports = function (app) {

    //Takes email & Password from client & checks if the user exists and password is correct
    //If that is the case it is going to create a token and pass it back to the client
    app.post("/api/login", function (req, res) {
        const { email, password } = req.body;
        const dbUser = db.User.findOne({ where: { email } }).catch(err => {
            res.status(500).json({ err, message: "Something unexpected happened" });
        });

        dbUser.then(user => {
            if (!user) {
                res.status(401).json({
                    message: "User not found."
                });
            } else if (!user.validPassword(password, user.get('password'))) {
                console.log(user.get('password'));
                console.log(user.validPassword(password, user.get('password')));
                res.status.json({
                    message: "Incorrect password."
                });
            } else {
                const token = passport.genToken(user.toJSON());
                res.json(token);
            }
        })

    });
    //true if the user has been successfully authenticated and has a token, not authenticated the middleware will return no token
    app.post("/api/verifyToken", function (req, res) {
        res.json({ success: true });
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
    // app.get("/api/user_data", function (req, res) {
    //     if (!req.User) {
    //         // The user is not logged in, send back an empty object
    //         res.json({});
    //     }
    //     else {
    //         // Send back the user's email and id
    //         res.json({
    //             email: req.user.email,
    //             id: req.user.id
    //         });
    //     }
    // });

    app.get("/api/decks", function (req, res) {
        db.Deck.findAll({}).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });
    //Grab all decks
    //This will be a client side request at the bottom of the home page showing all decks available
    app.get("/api/decks/:id", function (req, res) {
        db.Deck.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Card]
        }).then(function (dbCards) {
            res.json(dbCards);
        });
    });


    app.get("/api/allcards/:DeckId", function (req, res) {
        db.Card.findAll({
            where: {
               DeckId: req.params.DeckId
            },
        }).then(function (dbCards) {
            res.json(dbCards);
        })
    })

    app.delete("/api/decks/:id", function (req, res) {
        db.Deck.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    })



    app.post("/api/decks", function (req, res) {
        db.Deck.create(req.body).then(function (dbDeck) {
            res.json(dbDeck);
        })
            .then(function () {
                res.json("Update")
            })
    })


    //Get the cards associated with deck ID (when clicking into deck)
    app.get("/api/cards/:DeckId", function (req, res) {
        db.sequelize.query(`SELECT users.email, users.id, decks.title, decks.body , cards.front, cards.back, cards.id cardId, decks.id decksId FROM 
        users LEFT JOIN decks on users.id = decks.UserId
        LEFT JOIN cards on cards.DeckId = decks.id
        where decks.id =${req.params.DeckId}; `).then((results) => {
            res.json(results);
        }).catch(err => {
            res.status(500).send('Err executing command ' + err).end()
        })
    })
    app.get("/api/card", function (req, res) {
        res.json({name:"First card"})
    })

    //This will allow us to determine who the deck is created by
    // app.get("/api/decks/name/:id", function (req, res) {
    //     db.Deck.findAll({

    //         include: [{
    //             model: db.User,
    //             attributes: ['email'],
    //             where: {
    //                 userId: db.Sequelize.col('User.id'),
    //                 DeckId: req.params.id
    //             }
    //         }],
    //     }).then(function (result) {
    //         res.json(result);
    //     })
    // })
    //Add new deck 
    // app.post("/api/new/deck", function (req, res) {
    //     console.log("req.body", req.body)
    //     db.Deck.create(
    //         {
    //             title: req.body.title,
    //             body: req.body.body,
    //             id: req.body.id
    //         }
    //     ).then(function (result) {
    //         console.log(result.id);
    //         db.Card.create({
    //             front: req.body.front,
    //             back: req.body.back,
    //             DeckId: result.id
    //         }).then(function (result) {
    //             res.json(result);
    //         })


    //     })
    // })

    //Add new cards
    // app.post("/api/new/card", function (req, res) {
    //     console.log("req.body", req.body)
    //     db.Card.create({

    //         front: req.body.front,
    //         back: req.body.back,
    //         DeckId: req.body.DeckId

    //     }).then(function (result) {
    //         res.json(result);
    //     })
    // }
    // )

    // //Update card within deck based off of id
    // app.put("/api/card/update/:id", function (req, res) {
    //     db.Card.update({
    //         front: req.body.front,
    //         back: req.body.back
    //     }, {
    //         where: {
    //             id: req.params.id
    //         }

    //     }).then(function () {
    //         res.json("Update")
    //     })
    // })

    //This will delete the user saved decks (in the carousel)





    //Deletes the card from the corresponding deck (userdeck)
    // app.delete("/api/card/decks/:id", function (req, res) {
    //     db.Card.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (dbCard) {
    //         res.json(dbCard);
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
    // //This will be a client side request when clicking a specific deck on the carousel
    // //Retrieve all cards in deck based off of click from carousel are all db decks
    // app.get("/api/decks/:id", function (req, res) {
    //     db.Deck.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (req, res) {
    //         db.Card.findAll({
    //             where: {
    //                 DeckId: req.params.DeckId
    //             },
    //         })

    //             .then(function (dbCards) {
    //                 res.json(dbCards);
    //             })
    //     })
    // })

}
