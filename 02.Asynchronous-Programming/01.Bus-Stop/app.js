async function getInfo() {
    const input = document.getElementById('stopId');
    let busNr = input.value;

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + busNr;

    try{
        const response = await fetch(url);
        const data = await response.json();

        let busesUlElement = document.getElementById('buses');
        busesUlElement.innerHTML = '';

        document.getElementById('stopName').innerText = data.name;

        for ([busId, time] of Object.entries(data.buses)){
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time}`;
            busesUlElement.appendChild(liElement);
        }
        input.value = '';
    }catch (error){
        document.getElementById('stopName').innerText = 'Error';
        document.getElementById('buses').innerText = '';
    }




}