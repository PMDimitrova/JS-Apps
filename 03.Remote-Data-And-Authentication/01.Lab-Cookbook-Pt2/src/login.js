document.querySelector('form').addEventListener('submit', onLoginSubmit);

async function onLoginSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('http://localhost:3030/users/login/',{    //make a post-req = login user
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if(response.ok == false){       //check if the server's response is ok, and if not - alert the corresponding msg
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json(); //get the server response and save the data from it

    sessionStorage.setItem('userToken', data.accessToken); //save the accessToken of the logged user
    console.log(window.location.pathname);
    window.location.pathname = '/03.Remote-Data-And-Authentication/01.Lab-Cookbook-Pt2/index.html'; //redirect to the 'home' page
}