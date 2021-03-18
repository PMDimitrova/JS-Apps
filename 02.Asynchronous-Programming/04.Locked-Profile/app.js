async function lockedProfile() {
    /*
    +get the info from the server
    +make profile cards for each person from the obj it returns
        +name should be visible
        +insert the card to the div 'container'
     attach event listener to each card for the show more button,
            which should check whether the profile is locked or not
     */

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json();

    const card = document.getElementById('main');
    document.getElementById('container').removeChild(card);

    for (let user of Object.entries(data)){
        let currentCard = card.cloneNode(true);

        currentCard.getElementsByTagName('input')[2].value = user[1].username;
        currentCard.getElementsByTagName('input')[3].value = user[1].email;
        currentCard.getElementsByTagName('input')[4].value = user[1].age;

        currentCard.getElementsByTagName('input')[0].checked;

        document.getElementById('container').appendChild(currentCard);
    }

    Array.from(document.getElementsByTagName('main')).forEach(mainElement =>{
        mainElement.addEventListener('click',function(e) {
            if (e.target.textContent === 'Show more' || e.target.textContent === 'Hide it') {
                let lock = e.target.parentElement.querySelector('input[value="lock"]');

                let hiddenDiv = e.target.previousElementSibling;

                if (hiddenDiv.style.display === '' && lock.checked === false) {
                    hiddenDiv.style.display = 'block';
                    e.target.textContent = 'Hide it';

                } else if (hiddenDiv.style.display === 'block' && lock.checked === false) {
                    hiddenDiv.style.display = '';
                    e.target.textContent = 'Show more';
                }
            }
        })
    });


//display - block/none/''
}