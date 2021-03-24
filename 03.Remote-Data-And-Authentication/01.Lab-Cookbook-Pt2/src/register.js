document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if(email == '' || password == ''){
        return alert('All fields are required!');
    }else if(password != repass){
        return alert('Passwords don\'t match!');
    }

    const response = await fetch('http://localhost:3030/users/register',{       //make a post-req = register user
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if(response.ok == false){       //check if the server's response is ok, and if not - alert the corresponding msg
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json(); //get the server response and save the data from it

    sessionStorage.setItem('userToken', data.accessToken); //save the accessToken of the newly registered user

    window.location.pathname = '/03.Remote-Data-And-Authentication/01.Lab-Cookbook-Pt2/index.html'; //redirect to the 'home' page
}