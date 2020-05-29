$(document).ready(function () {

    const card = (title, body) => `
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

    fetchApi({
        url: '/api/decks',
        method: 'GET',

    }).then(function (data) {


        for (let i = 0; i < data.length; i++) {
            const deck = data[i];
            addContent(deck.title, deck.body);
        }
    })

    const addContent = (title, body) => {
        //grabbing the container of where to add the decks
        const container = document.querySelector('.all-decks .row');
        const cardEl = document.createElement('div');
        cardEl.innerHTML = card(title, body);
        $(cardEl).find('button').click(e => {
            
        })
    
        // the next two lines are creating a div with a class of row
        container.innerHTML += card(title, body);
    }




})