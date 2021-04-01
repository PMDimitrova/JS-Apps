import {render, html} from '../../node_modules/node_modules/lit-html/lit-html.js';

const listTemplate = (data) => html`
        <ul>
            ${data.map(t => html`<li>${t}</li>`)}
        </ul>
    `;

document.getElementById('btnLoadTowns').addEventListener('click', updateList);

function updateList(event){
    event.preventDefault();

    const inputData = document.querySelector('#towns').value;
    const towns = inputData.split(', ').map(x => x.trim());

    const root = document.getElementById('root');
    const result = listTemplate(towns);

    render(result, root);

}

