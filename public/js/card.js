

$(document).ready(function () {
    console.log('???')
    let params = (new URL(document.location)).searchParams;
    let cardId = params.get('cardId')

    fetchApi({
        url: '/api/card/' + cardId,
        method: "GET"
    }).then(function (card) {
        //Card has card.front & card.back
        let frontofCard = document.querySelector('.card-front');
        frontofCard.innerHTML = card.front;
        let backofCard = document.querySelector('.card-back');
        backofCard.innerHTML = card.back;

    })
});

