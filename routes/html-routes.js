var path = require("path");

module.exports = function (app) {


    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/deck.html"));
    });


    app.get("/card", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/card.html"));
    });

    app.get("/cards", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/card.html"));
    });

    app.get("/deck", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/deck.html"));
    });

    app.get("/newdeck", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/newdeck.html"));
    });

    app.get("/authors", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/author-manager.html"));
    });

};