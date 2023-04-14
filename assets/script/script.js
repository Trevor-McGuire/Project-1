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
 * @returns 
 */
async function getWeather(location){
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    //var weatherApiKey = "KpAGFgRmxnfvYhtHvLxCZNTAlIPAffIV";
    var weatherApiKey = "4aZo1qVaQKrX2oZsXAE0hb7HvyrE0cWv";
    const response = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=' + location + '&timesteps=hourly&units=imperial&apikey=' + weatherApiKey, options);
    
    // check that response was not okay
    if (!response.ok) {
      throw new Error("problem with");
    }
    const jsonData = await response.json();
    
    // log response
    console.log(response);
    console.log(jsonData);
    
    var ret = [];
    // for each hour we want the temperature, weatherCode 
    for (var i = 0; i < 5; i++){
      var temp = jsonData.timelines.hourly[i].values.temperature;
      var code = jsonData.timelines.hourly[i].values.weatherCode;
      ret.push([temp, code]);
    }
    console.log(JSON.stringify(ret));
    return ret;
}

function getTestWeather(location){
  var ret = [];
  ret.push([70.47, 1102]);
  ret.push([67.28,1102]);
  ret.push([64.26,1000]);
  ret.push([62.61,1001]);
  ret.push([60.89,1101]);
  return ret;
}

console.log(JSON.stringify(getTestWeather("some spot")));

///////////////////////////////////
/* Places API Commands */
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
  })
  console.log(autocomplete)
})

