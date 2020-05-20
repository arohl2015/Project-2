//Going to need the functionality to add a new card and append more html
//Going to need the functionality to add a new deck this would be a post request
let titleInput = $("#title")
let categoryInput = $("#category")
let frontofCard;
let backofCard;


$(document).ready(function () {
    let addnewCard = () => {
        $('#add-card').on('click', () => {
            alert("card added")
            let addcardHTML = $('<div class="row"><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Front of Card"></textarea><label for="textarea1"></label></div></div></form><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Back of Card"></textarea><label for="textarea1"></label></div></div></form>')
            let containertoaddCard = $('.add-input');
            containertoaddCard.append(addcardHTML);
        })
    }

    let postDeck = () => {
        $('#add-deck').on('submit', (event) => {
            event.preventDefault();
            let deck = {
                title: titleInput.value(),
                category: categoryInput.value()
            }
            addDeck(deck);
        })

    }

    let addDeck = (deck) => {
        $.post("/api/posts/", deck, () => {
            window.location.href = "/deck";
        })
    }

    let grabCards = () => {

    }

    addnewCard();
    postDeck();



})