// Going to need to make a post request to the database to add card
{/* <title>Save Cards</title>  */}
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script type="text/javascript"> */}
$(document).ready(function (){

var $cards = $('#cards');

$.ajax({
type: 'GET',
url:'/models/card',
success: function(cards) {
    $.each(cards, function(i, card) {
        $cards.append('<li>cardId: '+ card.cardId +', card: '+ '</li>');
    });
},
error: function() {
    alert('error loading card');
}
});
});

$('#add-card').on('click', function() {

var card = {
    name: $cardID(),
    card: $card.val(),
};

$.ajax({
    type: 'POST',
    url: '/models/card/',
    success: function(newCard) {
        $cards.append('<li>cardId: '+ Newcard.cardId +', card: '+ '</li>');
},
error: function() {
    alert('error posting card');

    }
// </script>
