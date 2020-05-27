$(document).ready(function () {

function showdeckCards(deckId) {

    $.get("/api/cards" + deckId, function(results) {
       console.log("results", results)
    })
}
});