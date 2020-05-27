// Going to need to make a post request to the database to add card
{/* <title>Save Cards</title>  */}
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script type="text/javascript"> */}
// Going to need to make a post request to the database to add card
{/* <title>Save Cards</title>  */}
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script type="text/javascript"> */}
$(document).ready(function (){
    var $cards = $('#cards');
    $.ajax({
    type: 'GET',
    //updated routing to match api-routes
    url:'/api/card',
    //per tutor, said the cards function may need to be modified to read
    //cards.data or along those lines
    success: function(cards) {
        console.log(cards);
        // $.each(cards, function(i, card) {
        //     $cards.append('<li>cardId: '+ card.cardId +', card: '+ '</li>');
        // });
    },
    error: function() {
        alert('error loading card');
    }
    });
    });
    $('#add-card').on('click', function() {
    //tutor was not sure what the var on line 27 links to
    var card = {
        name: $cardID(),
        card: $card.val(),
    };
    $.ajax({
        type: 'POST',
        url: '/api/cards/',
        success: function(newCard) {
            console.log(newCard);
            $cards.append('<li>cardId: '+ Newcard.cardId +', card: '+ '</li>');
    },
    error: function() {
        alert('error posting card');
        }
    })
    })
    // </script>
