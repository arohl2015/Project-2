$(document).ready(function () {

    const cardGen = (title, body, id) => `
    <div class="col s6 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${title}</span>
          <p>${body}</p>
          <button>Add to deck</button>
        </div>
      </div>
    </div>
`

    const cardDeckGen = (title, body, id) => `
<div class="col s6 m6">
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">${title}</span>
      <p>${body}</p>
      <a href="/cards?deckId=${id}">Go to Deck</a>
    </div>
  </div>
</div>
`

    fetchApi({
        url: '/api/decks',
        method: 'GET',

    }).then(function (data) {


        for (let i = 0; i < data.length; i++) {
            const deck = data[i];
            addContent(deck.title, deck.body, deck.id);
        }
    })

    const addContent = (title, body, id) => {
        //grabbing the container of where to add the decks
        const container = document.querySelector('.all-decks .row');
        const cardEl = document.createElement('div');
        cardEl.innerHTML = cardGen(title, body);

        $(cardEl).find('button').click(e => {
            const cardDeck = document.createElement('div');
            cardDeck.innerHTML = cardDeckGen(title, body, id);
            const carouselEl = document.createElement('a');
            carouselEl.classList.add('carousel-item');
            carouselEl.appendChild(cardDeck);
            document.querySelector('.carousel-initialize').appendChild(carouselEl);

            carouselInstance.destroy();
            document.querySelector('.carousel').remove();
            const carousel = document.querySelector('.carousel-initialize').cloneNode(true);
            carousel.classList.remove('carousel-initialize');
            carousel.classList.add('carousel');
            carousel.style.display = "block";
            document.querySelector('.slider').prepend(carousel);
            carouselInstance = M.Carousel.init(carousel, {
                indicators: true,
                height: 400,
                width: 500,
                transition: 600,
                interval: 4000
            });
        })

        // the next two lines are creating a div with a class of row
        container.appendChild(cardEl);
    }




})