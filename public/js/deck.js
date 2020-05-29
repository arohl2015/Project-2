//Going to need the functionality to add a new card and append more html
//Going to need the functionality to add a new deck this would be a post request
let titleInput = $(".title")
let categoryInput = $(".category")
let frontofCard;
let backofCard;


$(document).ready(function () {
    //Called from utilities to make sure we are authorized
    ensureLoggedIn();
    // on the add card button when clicked append to container
    let addnewCard = () => {
        $('#add-card').on('click', () => {
            
            let addcardHTML = $('<div class="row deck__card"><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Front of Card"></textarea><label for="textarea1"></label></div></div></form><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Back of Card"></textarea><label for="textarea1"></label></div></div></form>')
            let containertoaddCard = $('.add-input');
            containertoaddCard.append(addcardHTML);
        })
    }
    //When add deck is clicked the cards will be consolidated into an array and
    // uses the map which converts the dom elements grabbed from the query selector
    // to an object with keys of front & back grabbing the values.
    let postDeck = () => {
        $('#add-deck').on('click', () => {
            console.log("entering the deck route");
            const cards = Array.from(document.querySelectorAll('.deck__card')).map(card => {
                return {
                    front: card.querySelectorAll('textarea')[0].value,
                    back: card.querySelectorAll('textarea')[1].value,
                }
            });
            //Declares deck as an object grabbing the title and category html element value.
            // also grabs the cards which were mapped into an array of objects
            // the userID is parsed into a JSON object from localstorage (where the tokens are stored)
            // Local storage is inherently a string, that is why we need to parse.
            // The "|| '{}'" part is if the auth token is invalid, the application will not crash
            // because the empty object is a valid string to be parsed by JSON
            // The empty object will return undefined. (it will send undefined to the backend)
            // Ideally this situation would not happen because a user would be logged in, which
            // means the user will be logged in. Just meant to be a safety check
            let deck = {
                title: titleInput.val(),
                category: categoryInput.val(),
                cards,
                userId: JSON.parse(localStorage.authToken || '{}').user
            }
            //Adding deck
            addDeck(deck);

        })
    }
    // Calling the fetchApi function which
    let addDeck = (deck) => {
        fetchApi({
            //This is the options parameter in the fetchAPi in utilities.js
            url: "/api/new/deck",
            method: "POST",
            data: JSON.stringify(deck),
            contentType: "application/json"
        }).then(res => {
            //redirects to the deck page
            window.location.href = "/deck";
        })
    }

    addnewCard();
    postDeck();





})