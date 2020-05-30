

$(document).ready(function () {
    console.log('???')
    //if you type document.location in the DOM then it will give you a
    //location object which holds parts like pathname, port, etc...
    //The new URL object allows us to grab the search parameters that
    //is why it is instantiated. The.get within the URL, within the search
    //Params object has the get method which gives back the ID
    let params = (new URL(document.location)).searchParams;
    let cardId = params.get('cardId')
    fetchApi({
        url: '/api/card/' + cardId,
        method: "GET"
    }).then(function (card) {
        let frontofCard = document.querySelector('.card-front');
        frontofCard.innerHTML = card.front;
        let backofCard = document.querySelector('.card-back');
        backofCard.innerHTML = card.back;

    })

    //Grabbing the next & previous ID from the url
    //We need the parse int because it is read as a string
    const nextId = (parseInt(cardId, 10) + 1);
    const prevId = (parseInt(cardId, 10) - 1);
    //makeArrow takes in two parameters & runs the fetchApi
    //The fetchapi returns an ajax a get method.
    //If there is a card with the respective ID then we will receive
    // the card data.
    // In the promise if the next or previous card exists in the database
    // then it will replace the client url with the id incremented or decremented
    // If there is not a previous or next card the arrow will be removed.
    const makeArrow = (direction, id) => fetchApi({
        url: '/api/card/' + id,
        method: "GET"
    }).then(function (card) {
        if (card) {
            $('.arrow_' + direction).attr('href', '/card?cardId=' + id)
        } else {
            $('.arrow_' + direction).remove();
        }
    })
    //Call the makeArrow function with both the forward and back class
    makeArrow('forward', nextId);
    makeArrow('back', prevId);
});

