var input = document.querySelector("#search-input")
var button = document.querySelector("#search-button")
var modalEL = document.getElementById("defaultModal")
var closeBtnEl =document.getElementById("close");
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
    article.setAttribute("data-modal-target", "defaultModal");
    article.setAttribute("data-modal-toggle", "defaultModal");
    article.classList.add( "text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800")
    article.textContent = i
    article.addEventListener("click", showModal);
    main.append(article);
  }
}

closeBtnEl.addEventListener("click", hideModal);


function showModal(){
modalEL.classList.remove("hidden");
}

function hideModal(){
  modalEL.classList.add("hidden"); 
}



// function transformToPhase3(e) {
//   // log that function was called 
//   console.log("transformToPhase3() activated")

//   // set elements to variables
//   var header = document.querySelector("header")
//   var aside = document.querySelector("aside")
//   var main = document.querySelector("main")

//   // change heights and widths
//   header.setAttribute("style","height:20%;width:100%")
//   aside.setAttribute("style","height:80%;width:50%")
//   main.setAttribute("style","height:80%;width:50%")

//   // print which <article> was clicked on to <aside>
//   aside.textContent = `You just clicked the <article id="${e.target.id}">`
// }


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

/**
 * Takes in a latitude and logitude value and then outputs a json response
 * @param {int} latitude 
 * @param {int} longitude 
 * @returns 
 */
async function getNearByLocations(latitude, longitude){
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
    var name = jsonData.results[i].names;
    var place_id = jsonData.results[i].place_id;
    var rating = 
    ret.push([temp, code]);
  }
  console.log(JSON.stringify(ret));
  return ret;
}

/**
 * Takes in a weatherCode and returns an image in its likeness
 * @param {int} weatherCode 
 * @param {boolean} day 
 * @returns link to image
 */
function getWeatherCodeImage(weatherCode, day){
  switch(weatherCode) {
    case 1000:
      if(day)
        return "https://files.readme.io/48b265b-weather_icon_small_ic_clear3x.png";
      else
        return "https://files.readme.io/a31c783-weather_icon_small_ic_clear_night3x.png";
    case 1100:
      if(day)
        return "https://files.readme.io/c3d2596-weather_icon_small_ic_mostly_clear3x.png";
      else
        return "https://files.readme.io/28c3d6e-weather_icon_small_ic_mostly_clear_night3x.png";
    case 1101:
      if(day)
        return "https://files.readme.io/5ef9011-weather_icon_small_ic_partly_cloudy3x.png";
      else
        return "https://files.readme.io/6af2ec5-weather_icon_small_ic_partly_cloudy_night3x.png";
    case 1102:
      if(day)
        return "https://files.readme.io/6beaa54-weather_icon_small_ic_mostly_cloudy3x.png";
      else
        return "https://files.readme.io/9e23bdd-weather_icon_small_ic_mostly_cloudy_night3x.png";
    
    case 1001:
      return "https://files.readme.io/4042728-weather_icon_small_ic_cloudy3x.png";
    case 1103:
      if(day)
        return "https://files.readme.io/c3d2596-weather_icon_small_ic_mostly_clear3x.png";
      else
        return "https://files.readme.io/28c3d6e-weather_icon_small_ic_mostly_clear_night3x.png";
    case 2100:
      return "https://files.readme.io/76580b9-weather_icon_small_ic_fog_light3x.png";
    case 2000: 
      return "https://files.readme.io/8d37852-weather_icon_small_ic_fog3x.png";
    case 2101:
      if(day)
      return "https://files.readme.io/cc2d732-weather_icon_small_ic_fog_light_mostly_clear3x.png";
    else
      return "https://files.readme.io/c24bc3a-weather_icon_small_ic_fog_light_mostly_clear_night3x.png";
    case 2102:
    case 2103:
      if(day)
      return "https://files.readme.io/e7fdaa7-weather_icon_small_ic_fog_light_partly_cloudy3x.png";
    else
      return "https://files.readme.io/7922093-weather_icon_small_ic_fog_light_partly_cloudy_night3x.png";
    
    //case for clouds and fog
    case 2102:
    case 2107:
    case 2108:
      if(day)
        return "https://files.readme.io/7fa23d2-weather_icon_small_ic_fog_partly_cloudy3x.png";
      else
        return "https://files.readme.io/fbbb8b2-weather_icon_small_ic_fog_partly_cloudy_night3x.png";
    //case drizle
    case 4000:
      return "https://files.readme.io/f22e925-weather_icon_small_ic_rain_drizzle3x.png";
    //case light rain
    case 4200:
      return "https://files.readme.io/ea98852-weather_icon_small_ic_rain_light3x.png";
    //case rain
    case 4001:
      return "https://files.readme.io/aab8713-weather_icon_small_ic_rain3x.png";
    //case heavy rain
    case 4201:
      return "https://files.readme.io/fdacbb8-weather_icon_small_ic_rain_heavy3x.png";
    //case drizzle and sky
    case 4203:
    case 4204:
    case 4205: 
      if(day)
        return "https://files.readme.io/115b3d3-weather_icon_small_ic_rain_drizzle_partly_cloudy3x.png";
      else
        return "https://files.readme.io/3c0777c-weather_icon_small_ic_rain_drizzle_partly_cloudy_night3x.png";
    //case light rain and sky
    case 4213:
    case 4214:
    case 4215: 
      if(day)
        return "https://files.readme.io/fcae973-weather_icon_small_ic_rain_light_partly_cloudy3x.png";
      else
        return "https://files.readme.io/ed6d922-weather_icon_small_ic_rain_light_partly_cloudy_night3x.png";
    //case rain and sky
    case 4213:
    case 4214:
    case 4215:
    case 4213:
    case 4214:
    case 4215:
      if(day)
        return "https://files.readme.io/f9e9159-weather_icon_small_ic_rain_heavy_mostly_cloudy3x.png";
      else
        return "https://files.readme.io/5b51f31-weather_icon_small_ic_rain_heavy_partly_cloudy_night3x.png";

    //case flurries
    case 5001:
      return "https://files.readme.io/1174193-weather_icon_small_ic_flurries3x.png";
    //case light snow
    case 5100:
      return "https://files.readme.io/c736bc9-weather_icon_small_ic_snow_light3x.png";
    //case snow
    case 5000:
      return "https://files.readme.io/731a898-weather_icon_small_ic_snow3x.png";
    //case heavy snow
    case 5101:
      return "https://files.readme.io/20c73b9-weather_icon_small_ic_snow_heavy3x.png";
    //case snow and rain
    case 5110:
    case 5108:
    case 5114:
    case 5112:
    case 5122:
      return "https://files.readme.io/7c23873-weather_icon_small_ic_wintry_mix3x.png";
    //case snow and sky
    case 5115:
    case 5116:
    case 5117:
    case 5102:
    case 5103:
    case 5104:
    case 5105:
    case 5106:
    case 5107:
    case 5119:
    case 5120:
    case 5121:
      if(day)
        return "https://files.readme.io/8d0be01-weather_icon_small_ic_snow_light_partly_cloudy3x.png";
      else
        return "https://files.readme.io/60374f7-weather_icon_small_ic_snow_light_partly_cloudy_night3x.png";
    //case thunder storm
    case 8000:
    case 8001:
    case 8003:
    case 8002:
        return "https://files.readme.io/39fb806-weather_icon_small_ic_tstorm3x.png";
    default:
      return null;
  }
}

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