function attachEvents() {
    /*
    +onclick load-btn get all the phone-nums from the server
         +display them in <li> in the required format + delete-btn
         -attach event listener to this btn and create delete-function
             -it should send 'delete'-request to the server
             -the delete-request should return a response in a specific format
     -onclick create-btn
         -> post-request to the server
         -> clear the input fields
         -> reload phonebook (repeat the function from above)
     */

    document.getElementById('btnLoad').addEventListener('click', fetchDataFromServer);

    document.getElementById('btnCreate').addEventListener('click', createNewEntry);
}

async function fetchDataFromServer() {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();
    document.getElementById('phonebook').innerHTML = '';

    Object.entries(data).forEach(element => createAttachPhoneNr(element));

    Array.from(document.getElementsByClassName('btnDelete')).forEach(el => {
        el.addEventListener('click', deleteEntry);
    });

}

function createAttachPhoneNr(element) {
    let id = element[0];
    let human = element[1];
    let htmlElement = `<li>${human.person}: ${human.phone} <input type="hidden" id="${id}"> <button class="btnDelete">Delete</button> </li>`;
    document.getElementById('phonebook').innerHTML += htmlElement;
}

async function deleteEntry(event) {
    const idToDelete = event.target.parentNode.querySelector('input').id;

    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + idToDelete,{
        method: 'delete',
    });

    fetchDataFromServer();
}

async function createNewEntry(event){
    let name = document.getElementById('person');
    let phoneNum = document.getElementById('phone');

    const personToAdd ={
        person: name.value,
        phone: phoneNum.value
    }

    const result = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(personToAdd)
    });

    name.value = '';
    phoneNum.value = '';

    fetchDataFromServer();
}

attachEvents();