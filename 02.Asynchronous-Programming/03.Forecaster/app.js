function attachEvents() {
    /*
    +get the locationNr from the input field
    add event listener to btn with id submit
    make a request to the main locations list and attach it to the event listener
    find the location we need from the provided data via name and get its code value with 'code'
    for current conditions:
        make a req to the other provided url with this code
    for 3 day forecast:
        make req to other url
    use info from these 2 Obj
    change the display to the forecast to 'visible'
    change the 'current cond' & 'three-day cond' in the html using the provided in the doc codes
    on error -> display "error" in the forecast section -> use try-catch
    */


    let locationNr = document.getElementById('location').value;
    document.getElementById('submit').addEventListener('click', doThing);

    function doThing(){
        console.log(locationNr);
        console.log('failed');
    }


}

attachEvents();