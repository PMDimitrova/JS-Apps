document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line != '');
    const steps = formData.get('steps')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line != '');

    const token = sessionStorage.getItem('userToken');

    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({name, img, ingredients, steps})
    });

    if (response.ok == false){
        const error =await response.json();
        return alert(error.message);
    }

    window.location.pathname = '/03.Remote-Data-And-Authentication/01.Lab-Cookbook-Pt2/index.html';
}