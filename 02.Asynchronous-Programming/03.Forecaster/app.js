function attachEvents() {
    /*
    +add event listener to btn with id submit
    +make a request to the main locations list and attach it to the event listener
    ++first of all make the get-requests!! and then the dom-modifications
        +find the location we need from the provided data via name and get its code value with 'code'
        +for current conditions:
            +make a req to the other provided url with this code
        +for 3 day forecast:
            +make req to other url
    ++get the locationNr from the input field
    +change the display to the forecast to 'visible'
    use info from these 2 Obj
        change the 'current cond' & 'three-day cond' in the html using the provided in the doc codes
        on error -> display "error" in the forecast section -> use try-catch
    */

    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

//get forecast
async function getWeather(){
    const input = document.getElementById('location');
    const cityName = input.value;
    let current = {};
    let upcoming = {};
   try{
       const code = await getCode(cityName);

       [current, upcoming] = await Promise.all([
           getCurrent(code),
           getUpcoming(code)
       ]);
   } catch (error){
       //todo handle error
   }
   document.getElementById('forecast').style.display = 'block';
   console.log(current);
   console.log('---------');
   console.log(upcoming);

   //todo find a way to make a node from html-string
   // let test = document.getElementById('forecast').innerHTML(createCurrentConditionsEl(current));

   // document.getElementById('forecast').appendChild();
   // document.getElementById('upcoming').appendChild(createForecastConditionsEl(upcoming));

}

//get the city-lists & find the corresponding code
async function getCode(cityName){
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();

    return data.find(city => city.name.toLowerCase() == cityName.toLowerCase()).code;

}

//get current conditions
async function getCurrent(code){
    const url = 'http://localhost:3030/jsonstore/forecaster/today/'+ code;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

//get upcoming conditions
async function getUpcoming(code){
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/'+ code;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function createCurrentConditionsEl(currentCond){
    return `
    <div class="forecasts">
    <span class="condition symbol">${getSpecialSymbol(currentCond.forecast.condition)}</span>
    <span class="condition">
        <span class="forecast-data">${currentCond.name}</span>
        <span class="forecast-data">${currentCond.forecast.low}&#176;/${currentCond.forecast.high}&#176;</span>
        <span class="forecast-data">${currentCond.forecast.condition}</span>
        </span>
    </div>
    `;
}
function createForecastConditionsEl(upcomingCond){

}
            
function getSpecialSymbol(input){
    switch (input){
        case 'Sunny': return '&#x2600;';
        case 'Partly sunny': return '&#x26C5;';
        case 'Overcast': return '&#x2601;';
        case 'Rain': return '&#x2614;';
    }
}