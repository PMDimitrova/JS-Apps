/*
    async functions comments:
        +load all books
        +create new book
        +update existing book
        +delete existing book
    event listeners: --> event delegation --> attached the evList. on the whole table
                        and find where the user has clicked
        +load all books btn
        +create new book
        -delete and edit buttons
    logic for updating input form updating and filling existing values (on edit)
    logic to reverse above changes

    main function:
        -attached event listeners
        +load all books and display them
        +attach the book
        -remove the book from dom
*/
async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    const rows = Object.entries(books).map(createBookElement).join('');
    document.getElementsByTagName('tbody')[0].innerHTML = rows;
}

function createBookElement([id, book]) {
    return `<tr data-id="${id}">
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>`;
}

async function createBook(event) {
    event.preventDefault();
    const formData =  new FormData(event.target);
    let book =  {
        author: formData.get('author'),
        title: formData.get('title')
    }
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });

    event.target.reset();
}

async function updateBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const book = {
        author: formData.get('author'),
        title: formData.get('title')
    }
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });

    console.log(result);

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    event.target.reset();
    getAllBooks();
}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    getAllBooks();
}

function start() {
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);

    document.getElementById('createForm').addEventListener('submit', createBook);

    document.getElementById('editForm').addEventListener('submit', updateBook);

    document.getElementById('table').addEventListener('click', handleTableClick);
    getAllBooks();
}

start();

function handleTableClick(event){
    if (event.target.className =='editBtn'){
        let bookId = event.target.parentNode.parentNode.dataset.id;
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        loadBookForEditing(bookId);
    }else if(event.target.className ==  'deleteBtn'){
        const confomration = confirm('Are you sure you want to delete this book?');
        if(confomration == true){
            let bookId = event.target.parentNode.parentNode.dataset.id;
            deleteBook(bookId);
        }

    }

}

async function loadBookForEditing(id){
    const book = await request('http://localhost:3030/jsonstore/collections/books/'+id);

    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
    document.querySelector('#editForm [name="id"]').value = book.id;

}
