var input = document.querySelector("#search-input")
var button = document.querySelector("#search-button")
input.addEventListener("keypress",locationPicked)
button.addEventListener("click",locationPicked)

// two ways to call this function: hitting 'enter' or click 'search'
function locationPicked(e) {
  var keyCode = e.code || e.key
  if (keyCode == 'Enter'){
    // Enter pressed
    console.log("locationPicker() called with 'enter' key")
    // todo validate input
    transformToPhase2()
  }
  if (e.target.id === "search-button") {
    // button clicked
    console.log("locationPicker() called with 'search' button")
    // todo validate input
    transformToPhase2()
  }
}

function transformToPhase2() {
  // log that function was called 
  console.log("transformToPhase2() activated")
  
  // set elements to variables
  var header = document.querySelector("header")
  var aside = document.querySelector("aside")
  var main = document.querySelector("main")
  var weather = document.querySelector(".weather")

  // clear anything from <aside> and <main>
  aside.textContent = '';
  main.textContent = '';

  // change heights and widths
  header.setAttribute("style","height:20%;width:100%")
  aside.setAttribute("style","height:80%;width:0%")
  main.setAttribute("style","height:80%;width:100%")
  weather.setAttribute("style","display:flex;")

  // create 20 rancom articles for testing purposes 
  for (i=0 ; i<20 ; i++) {
    var article = document.createElement("article")
    article.setAttribute("id",i)
    article.textContent = i
    article.addEventListener("click",transformToPhase3)
    main.append(article)
  }
}

function transformToPhase3(e) {
  // log that function was called 
  console.log("transformToPhase3() activated")

  // set elements to variables
  var header = document.querySelector("header")
  var aside = document.querySelector("aside")
  var main = document.querySelector("main")

  // change heights and widths
  header.setAttribute("style","height:20%;width:100%")
  aside.setAttribute("style","height:80%;width:50%")
  main.setAttribute("style","height:80%;width:50%")

  // print which <article> was clicked on to <aside>
  aside.textContent = `You just clicked the <article id="${e.target.id}">`
}


///////////////////////////////////
/* Fetch API Commands */
///////////////////////////////////

/**
 * Calls api.tomorrow.io to get the current hourly forcast for a string location
 * @param {} location 
 */
function getWeather(location){
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.tomorrow.io/v4/weather/forecast?location=' + location + '&timesteps=hourly&units=imperial&apikey=KpAGFgRmxnfvYhtHvLxCZNTAlIPAffIV', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

getWeather("milwaukee");



///////////////////////////////////
// Places API Commands */
// following function creates an autofill for the "search-input"
// the criteria is restricted to cities in the us
///////////////////////////////////

window.addEventListener("load",function() {
  var input = document.getElementById("search-input");
  var options = {
    types: ["(cities)"],
    componentRestrictions: { country: ["us"] },
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("No details available for input: '" + place.name + "'");
      return;
    }
    console.log(autocomplete)
  })
})

