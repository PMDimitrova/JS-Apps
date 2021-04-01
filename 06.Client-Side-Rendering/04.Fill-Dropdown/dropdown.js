import {html, render} from '../../node_modules/node_modules/lit-html/lit-html.js';

const selectTemplate = (list) => html`
    <select id="menu">
        ${list.map(town => html`<option value=${town._id}>${town.text}</option>`)}
    </select>`;

const endpoint = 'http://localhost:3030/jsonstore/advanced/dropdown';
const main = document.querySelector('div');
const input = document.getElementById('itemText');
initialize();

async function initialize(){
    document.querySelector('form').addEventListener('submit', (event) => addItem(event, list))

    const result = await fetch(endpoint);
    const data = await result.json();
    const list = Object.values(data);
    update(list);
}

function update(list){
    const result = selectTemplate(list);
    render(result, main);
}

async function addItem(event, list){
    event.preventDefault();
    const item = {
        text: input.value
    };
    input.value = '';
    const response = await fetch(endpoint, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    });
    const result = await response.json();

    list.push(result);

    update(list);
}