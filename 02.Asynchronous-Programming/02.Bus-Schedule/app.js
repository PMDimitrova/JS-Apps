function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let banner = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        //request info about upcoming stop
        //update banner with stop name
        //change button arrive & depart

        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next; // getting the first bus stop
        const response = await fetch(url);
        const data = await response.json();

        stop = data;

        banner.textContent = 'Next stop ' + stop.name;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        //update banner to show arrival
        //activate other button
        banner.textContent = 'Arriving at ' + stop.name;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();