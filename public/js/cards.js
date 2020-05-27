$(document).ready(function () {
    console.log("cards js")

    function showdeckCards(deckId) {
        // deckId = 1   /// thes is for testing 

        $.get("/api/allcards/" + deckId, function (results) {
            console.log("results", results, results.lenght)

            //show the info on the screen, build li and append to the ul class collecition 

            //loop results array of cardsfor
            for (var i=0; i< results.length; i++){
                console.log("---->",results[i])
            var liCard = `   <li class="collection-item avatar">
       <i class="material-icons circle green" } >code</i>
       <span class="title" back=${results[i].back}>${results[i].front}</span>
       <p> <br>
       
       </p>
       <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
   </li>`

            $("#cardsdeck").append(liCard)
            }
        

        //en of the llop
        $(".title").on("click", function(){
            event.preventDefault()
            console.log(this)
            var back = $(this).attr("back")
            $(this).text(back)
        })
        // add onclick to the cards  (this will flip the card)
    })
    }

    showdeckCards(1)

})