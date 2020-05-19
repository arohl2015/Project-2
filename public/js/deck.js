//Going to need the functionality to add a new card and append more html
//Going to need the functionality to add a new deck this would be a post request
$(document).ready(function () {
    let addnewCard = () => {

        $('#add-card').on('click', () => {
            alert("card added")
            let addcardHTML = $('<div class="row"><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Front of Card"></textarea><label for="textarea1"></label></div></div></form><form class="col s5"><div class="row"><div class="input-field col s6"><i class="material-icons prefix">code</i><textarea id="textarea1" class="materialize-textarea" placeholder="Back of Card"></textarea><label for="textarea1"></label></div></div></form>')
            let containertoaddCard = $('.add-input');

            containertoaddCard.append(addcardHTML);

        })


    }

    addnewCard();

})