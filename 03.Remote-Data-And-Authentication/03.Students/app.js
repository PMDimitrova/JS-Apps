// window.addEventListener('load', mainFunction);

function mainFunction(){
    fetchDataFromServer();
    const form = document.getElementById('form');
    form.addEventListener('submit', event =>{
        event.preventDefault();
        const formData = new FormData(form);

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const facultyNumber = formData.get('facultyNumber');
        const grade = formData.get('grade');

        try{
            checkIfEmpty([firstName, lastName, facultyNumber, grade]);

            const student = {
                firstName: firstName,
                lastName: lastName,
                facultyNumber: facultyNumber,
                grade: grade,
            };

            displayStudent(student);
            addStudentToDB(student);

            event.target.reset();
        }catch (error){
            alert(error.message);
        }

    });
}

async function fetchDataFromServer(){
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    Object.entries(data).forEach(element => displayStudent(element[1]));
    // console.log(data);
}

function checkIfEmpty(inputArray){
    inputArray.forEach(input => {
        if (input.trim() === ''){
            throw new Error('All fields are required!');
        }
    });
}

function displayStudent(person){
    let {firstName} = person;
    let {lastName} = person;
    let {facultyNumber} = person;
    let {grade} = person;

    let studentElement = `<tr><td>${firstName}</td><td>${lastName}</td><td>${facultyNumber}</td><td>${grade}</td></tr>`;
    document.getElementById('tableBody').innerHTML += studentElement;
}

async function addStudentToDB(student){
    const response = await fetch('http://localhost:3030/jsonstore/collections/students',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)
    });
}

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
