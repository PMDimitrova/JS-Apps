import {html} from '../../node_modules/node_modules/lit-html/lit-html.js';
import * as api from './data.js';

const rowTemplate = (book) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td data-id=${book._id}>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    </tr>`;

const tableTemplate = list => html`
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody @click=${onBtnClick}>
        ${list.map(rowTemplate)}
        </tbody>
    </table>
`;

const createFormTemplate = () => html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

const editFormTemplate = book => html`
    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>`;

const layoutTemplate = (list, bookToEdit) => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    ${tableTemplate(list)}
    ${bookToEdit ? editFormTemplate(bookToEdit) : createFormTemplate()}`;


function onBtnClick(event){
    if (event.target.classList.contains('editBtn')){
        const id = event.target.parentNode.dataset.id;
        //todo add logic for rendering the template
    }else if(event.target.classList.contains('deleteBtn')){
        const id = event.target.parentNode.dataset.id;
        //todo add logic for rendering the template
    }
}

export {
    layoutTemplate
}