import {render, html} from '../../node_modules/node_modules/lit-html/lit-html.js';
import {towns} from "./towns.js";

const searchTemplate = (inputTowns, match) => html` 
    <article>
        <div id="towns">
            <ul>
                ${inputTowns.map(t => itemTemplate(t, match))}
            </ul>
        </div>
    <input type="text" id="searchText" .value=${match} />      <!-- we put .value and the match, so that a future render operation does not mess with the field -->
    <button @click="${search}">Search</button>
    <div id="result">${countMatches(towns, match)}</div>
    </article>`;

const itemTemplate = (name, match) => html`<li class=${(match &&
    name.toLowerCase().includes(match.toLowerCase())) ? 'active' : ''}>${name}</li>`;


const main = document.body;
function update(m = ''){
    const result = searchTemplate(towns, m);

    render(result, main);
}
update();


function search(event) {
   const match = event.target.parentNode.querySelector('input').value;

   update(match);
}

function countMatches (towns, match){
    const matches = towns.filter(t => (match && t.toLowerCase().includes(match.toLowerCase()))).length;

    if (matches){
        return `${matches} matches found`;
    }else{
        return '';
    }
}
