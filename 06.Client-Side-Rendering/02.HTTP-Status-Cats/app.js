import {render, html} from '../../node_modules/node_modules/lit-html/lit-html.js';
import {styleMap} from '../../node_modules/node_modules/lit-html/directives/style-map.js';
import {cats} from './catSeeder.js';

cats.forEach(c => c.info = false);

const catsHTML = (cats) => html`
    <ul>
    ${cats.map(cat => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${displayCat} class="showBtn">Show status code</button>
                <div class="status" style=${styleMap(cat.info ? {} : {display: 'none'})} id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p> 
                </div>
            </div>
        </li>`)}
    </ul>
`;

function displayCat(event){
    if(event.target.innerText === 'Show status code'){
        event.target.innerText = 'Hide status code';
        event.target.parentNode.querySelector(".status").style.display = 'block';
    }else{
        event.target.parentNode.querySelector(".status").style.display = 'none';
        event.target.innerText = 'Show status code';
    }
}

const allCats = document.getElementById('allCats');

render(catsHTML(cats), allCats);

// the event listener could be done with delegation and click on the <ul> element