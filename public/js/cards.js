$(document).ready(function () {
    console.log("cards js")

    function showdeckCards(deckId) {
        
        //Calling the fetchApi from the utilities, to insert the local auth token into the headers
        //so the server is able to validate it. 
        fetchApi({ url: "/api/allcards/" + deckId, method: "GET" }).then((results) => {
            console.log("results", results, results.length)

            //Show the info on the screen, build li and append to the ul class collection 
            //loop results array of cardsfor
            for (var i = 0; i < results.length; i++) {
                console.log("---->", results[i])
                //Adding the deckID to the url (client side uses the query params ?) to get that specific deck
                var liCard = `   <li class="collection-item avatar">
       <i class="material-icons circle green" } >code</i>
       
       <a href="/card?cardId=${results[i].id}"><span class="title" back=${results[i].back}>${results[i].front}</span></a>
       <p> <br>
       
       </p>
       <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
   </li>`

                $("#cardsdeck").append(liCard)
            }

           
        })
    }
    //If you type document.location in the DOM, there is a location object.
    // if you put location object in the new URL object it will allow you 
    //to access the search parameters. This let's us get the DeckID
    let params = (new URL(document.location)).searchParams;
    let deckId = params.get('deckId')

    showdeckCards(deckId)

})


 //en of the llop
            /* $(".title").on("click", function () {
                 event.preventDefault()
                 console.log(this)
                 var back = $(this).attr("back")
                 $(this).text(back)
             })*/
            // add onclick to the cards  (this will flip the card)