var carouselInstance = carouselInstance || null;
$(document).ready(function () {
    //Using template literals to put respective title & body of deck
    const cardGen = (title, body, id) => `
    <div class="col s6 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title" style ="text-align: center">${title}</span>
          <p style ="text-align: center">${body}</p>
          <a class="btn-floating btn-large waves-effect waves-light red button" style ="text-align: center"><i class="material-icons">add</i></a>
        </div>
      </div>
    </div>
`
    //Using template literals to put respective title & body of deck for carousel
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
    //Calling the fetch api returning an ajax get at the respective url
    fetchApi({
        url: '/api/decks',
        method: 'GET',

    }).then(function (data) {

        //Running through all of the decks in the database to print them out
        for (let i = 0; i < data.length; i++) {
            const deck = data[i];
            addContent(deck.title, deck.body, deck.id);
        }
    })
    //this is the method that is actually going to print out the decks
    const addContent = (title, body, id) => {
        //grabbing the container of where to add the decks
        const container = document.querySelector('.all-decks .row');
        //Instantiating an HTML element and then adding content to the card 
        const cardEl = document.createElement('div');
        cardEl.innerHTML = cardGen(title, body);
        //Finding the button inside the card element on click
        $(cardEl).find('.button').click(e => {
            //Instatiating an HTML element and then changing the htrml to the carousel deck & data
            const cardDeck = document.createElement('div');
            cardDeck.innerHTML = cardDeckGen(title, body, id);
            //Instantiating an html element with an a class and adding the carousel-item class to it
            const carouselEl = document.createElement('a');
            carouselEl.classList.add('carousel-item');
            //Appending the card deck to the carousel element
            carouselEl.appendChild(cardDeck);
            //Appending the carousel element to the highest carousel div
            document.querySelector('.carousel-initialize').appendChild(carouselEl);
            /*
                Materialize Carousel is built to be static, it is initialized the first time and that's it
                In order to allow it to dinamically add new decks, we're creating a fake container that holds all the decks
                And when we add a new one, we actually deleted the old Carousel and recreate a new one from scratch with the data
                from the "fake carousel" carousel-initialize

                All of this is necessary just because Materialize Carousel lacks a Add/Delete method. We can just initialize a carousel
                but we can't modify it later
            */
            //Checking if there is a carouselInstance and 
            //if there is one, destroy it
            carouselInstance && carouselInstance.destroy();
            //If there's an old carousel container in the DOM we'll delete it
            document.querySelector('.carousel') && document.querySelector('.carousel').remove();
            // Then we clone the carousel-initialize so we can reuse the old decks that were added previously
            const carousel = document.querySelector('.carousel-initialize').cloneNode(true);
            // We remove the carousel-initialize because this is going to
            //  be actually a real carousel that's going to be rendered
            carousel.classList.remove('carousel-initialize');
            carousel.classList.add('carousel');
            // We change display none to display block so it's going to be shown in the page
            carousel.style.display = "block";
            //Prepending the section with class of slider from materialize framework
            document.querySelector('.slider').prepend(carousel);
            //From materialize library
            carouselInstance = M.Carousel.init(carousel, {
                indicators: true,
                height: 400,
                width: 500,
                transition: 600,
                interval: 4000
            });
        })

        //Adding the cards
        container.appendChild(cardEl);
    }




})