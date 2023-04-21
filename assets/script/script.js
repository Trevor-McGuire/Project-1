var input = document.querySelector("#search-input")
var button = document.querySelector("#search-button")
var modalEL = document.getElementById("defaultModal")
var modalTitle = document.getElementById("modalTitle")
var modalPicture = document.getElementById("modalPicture")
var modalFavButton = document.getElementById("modalFavButton")
var modalUnFavButton = document.getElementById("modalUnFavButton")
var closeBtnEl =document.getElementById("close");
var placeNumberEl = document.getElementById("placeNumber")
var placeWebsiteEl = document.getElementById("placeWebsite")
var websiteDivEl = document.getElementById("websiteDiv")
var placeAddressEl = document.getElementById("placeAddress")
var favoriteBar = document.querySelector("#favoritebar");
var modalContent = document.querySelector("#modalContent");
var lat;
var lng;
input.addEventListener("keypress",locationPicked)
button.addEventListener("click",locationPicked)

var googleApiKey = "AIzaSyAIDjXvF9NUyB43bLbgtB83A9zYc5Tl2qI";

// two ways to call this function: hitting 'enter' or click 'search'
function locationPicked(e) {
  var location = placesAPI()
  var keyCode = e.code || e.key
  if (keyCode == 'Enter'){
    // Enter pressed
    transformToPhase2()
  }
  if (e.target.id === "search-button") {
    // button clicked
    transformToPhase2()
  }
}

function transformToPhase2() {
  
  // set elements to variables
  var header = document.querySelector("header")
  var aside = document.querySelector("aside")
  var main = document.querySelector("main")
  var weather = document.querySelector(".weather")

  // clear anything from <main>
  aside.textContent = '';
  main.textContent = '';

  // change heights and widths
  header.setAttribute("style","height:41%;width:100%")
  weather.setAttribute("style","display:flex;")
}

closeBtnEl.addEventListener("click", hideModal);

function showModal(){
modalEL.classList.remove("hidden");
}

function hideModal(){
  modalEL.classList.add("hidden"); 
}

///////////////////////////////////
/* Fetch API Commands */
///////////////////////////////////

/**
 * Calls api.tomorrow.io to get the current hourly forcast for a string location
 * @param {} location 
 * @returns 
 */
async function getWeather(latitute, longitude){
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    //var weatherApiKey = "KpAGFgRmxnfvYhtHvLxCZNTAlIPAffIV";
    var weatherApiKey = "4aZo1qVaQKrX2oZsXAE0hb7HvyrE0cWv";
    const jsonData = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=' + latitute + ',' + longitude + '&timesteps=hourly&units=imperial&apikey=' + weatherApiKey, options).then((response) => response.json());
    
    // check that response was not okay 
    //if (!response.ok) {
    //  throw new Error("problem with");
    //}
    //const jsonData = await response.json();
    
    // log response
    //console.log(response);
    //console.log(jsonData);
    
    var ret = [];
    // for each hour we want the temperature, weatherCode 
    for (var i = 0; i < 5; i++){
      var temp = jsonData.timelines.hourly[i].values.temperature;
      var code = jsonData.timelines.hourly[i].values.weatherCode;
      ret.push([temp, code]);
    }
    //console.log(JSON.stringify(ret));
    renderWeather(ret);
    return ret;
}

/**
 * Calls the getWeather call for input lat and lng and then renders the 
 * objects into the weather dashboard
 * @param {int} lat 
 * @param {int} lng 
 */
function renderWeather(currentWeather){
  // get list of current weather forcast
  var hour = 0;
  var iconURL;
  // get arrays of all weather items
  var weatherTimeEL= document.querySelectorAll(".weatherTime");
  var weatherIconEl = document.querySelectorAll(".weatherIcon");
  var weatherTempEl = document.querySelectorAll(".weatherTemp");
  for (var i = 0; i < 5; i++){
    //add i hours to get the time of forcast
    forcastTime = dayjs().add(i, 'hour');
    hour = parseInt(forcastTime.format('H'));
    // set current weather
    weatherTempEl[i].textContent = currentWeather[i][0] + '° F';
    // get weather code
    // check if day
    if (hour + i > 8 && hour + i < 18)
    iconURL = getWeatherCodeImage(currentWeather[i][1], true);
    else {
      iconURL = getWeatherCodeImage(currentWeather[i][1], false);
    }
    // set icon of weather
    weatherIconEl[i].setAttribute("src", iconURL);
    // set hour of forcast
    weatherTimeEL[i].textContent = forcastTime.format("h a");
  }
}
//uncomment getTestWeather to use for testing of weather rendering

  // function getTestWeather(location){
  //   var ret = [];
  //   ret.push([70.47,1102]);
  //   ret.push([67.28,1102]);
  //   ret.push([64.26,1000]);
  //   ret.push([62.61,1001]);
  //   ret.push([60.89,1101]);
  //   return ret;
  // }

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
// Places API Autofill */
// following function creates an autofill for the "search-input"
// the criteria is restricted to cities in the us
///////////////////////////////////

window.addEventListener("load",placesAPI)
function placesAPI() {
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
     lat = place.geometry.location.lat()
     lng = place.geometry.location.lng()
    getWeather(lat, lng)
    // have to set window.initMap to this google maps function
    window.initMap = getNearByLocations(lat,lng)
  })
  return autocomplete
} 

////////////////
/* Test stuff */
////////////////
// getNearByLocations2(43.0721661, -89.4007501);
//getPlaceDetails("ChIJ6ZCmmwkZBYgRwddsM097k6g", '{"lat": 43.0490129,"lng": -87.9015714}');
// getPlaceDetails("ChIJS2SkF39TBogRTsRYE0xQUXM", '{"lat": 43.0490129,"lng": -87.9015714}');



/////////////////////////////////////
/* Google Map and Places API stuff */
/////////////////////////////////////
var map;
var modalMap;
var service;
var infowindow;

/**
 * Uses the google maps to retrieve
 * nearby places to the inputed lat and long
 * @param {*} latitude 
 * @param {*} longitude 
 */
function getNearByLocations(latitude, longitude) {

  var pyrmont = new google.maps.LatLng(latitude, longitude);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 13
    });

  map.setOptions({ styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ]});
  var request = {
    location: pyrmont,
    radius: '3200',
    type: ['park'],
    keyword: 'dog'
  };

  service = new google.maps.places.PlacesService(map);
  // calls the service with the "request" and
  // when completed, goes to the callback function
  service.nearbySearch(request, callback);
}

/**
 * it will gather a list of all the objects in json 
 * and iterate through the the objects and add them to the map
 * @param {*} results 
 * @param {*} status 
 * @returns 
 */
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var jsonResults = results;
    var ret = [];
    // for each hour we want the temperature, weatherCode 
    for (var i = 0; i < jsonResults.length; i++){
      createMarker(results[i]);
    }
    map.setCenter(results[0].geometry.location);
    return ret;
  }
}

/**
 * makes a new marker object and adds an 
 * onclick event to getPlaceDetails
 * @param {*} place 
 * @returns 
 */
function createMarker(place){
  if (!place.geometry || !place.geometry.location) return;

  //adds rating to marker image
  const marker = new google.maps.Marker({
    map,
    label: place.rating + "",
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    getPlaceDetails(place.place_id, place.geometry.location);
  });

}

/**
 * uses google API to make a more detailed getPlaces call
 * This is used to generate the modal
 * @param {*} place_id 
 * @param {*} location 
 */
function getPlaceDetails(place_id, location){
  modalMap = new google.maps.Map(document.getElementById("modalMap"), {
    center: location,
    zoom: 15,
  });
  const request = {
    placeId: place_id,
  }
  const service = new google.maps.places.PlacesService(modalMap);
  service.getDetails(request, (place, status) => {
    showModal();
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const marker = new google.maps.Marker({
        modalMap,
        position: place.geometry.location,
      });
      // get the first picture and add to modal if it exists
      if(place.photos != null && typeof(place.photos) == "undefined"){
        modalPicture.setAttribute("src", "");
      } else {
        var photos = place.photos;
        modalPicture.setAttribute("src", photos[0].getUrl())
      }
      // set title into modal rating
      modalTitle.textContent =place.name + " (" + place.rating + ")";
      placeAddressEl.setAttribute('href', place.url);
      placeAddressEl.textContent = place.formatted_address
      if (place.website != null){
        placeWebsiteEl.textContent = place.website;
      }else {
        placeWebsiteEl.textContent = "";
      }
      if(place.formatted_phone_number != null){
        placeNumberEl.textContent = place.formatted_phone_number ;
      }
      //update modal button
      
      /**
       * creates a save to local function so that
       *  we can remove upon closing modal
       */
      function saveToLocal(){
        console.log("Clicked on modalFavButton for " + place.name);
        setLocalStorage(place.name, place.place_id);
      }

      /**
       * creates a unSave from local function so that
       *  we can remove upon closing modal
       */
      function unSaveFromLocal(){
        console.log("Clicked on modalUnFavButton for " + place.name);
        removeFromLocalStorage(place.place_id);
      }

      // event listener to remove added listeners for favorited buttons
      closeBtnEl.addEventListener("click", function() {
        modalFavButton.removeEventListener("click", saveToLocal);
        modalUnFavButton.removeEventListener("click", unSaveFromLocal);
      })
      
      //gathering/removing "favorited" from desired location
      modalFavButton.addEventListener("click", saveToLocal);
      modalUnFavButton.addEventListener("click", unSaveFromLocal);
    }
  })
}

////////////////
/* local storage */
////////////////

var favoritePlacesLocal = []


function getLocalStorage() {
  var temp = localStorage.getItem("dogsGoneWild");
  console.log("getLocalStorage starting")
  console.log("localStorage.getItem = "+temp);
  
  if (temp !== null) {
    try {
      favoritePlacesLocal = JSON.parse(temp);
    } catch (e) {
      favoritePlacesLocal = [];
    }
  }
  else{
    favoritePlacesLocal = [];
  }
  console.log(favoritePlacesLocal);
  renderFavBar()
}

//renders from the local storage
getLocalStorage()

//this function will render the fav bar to access our fav list
function renderFavBar() {
  console.log("in render fav bar");
  console.log("removing objects");
  
  //repopulate with new details
  console.log("loop times " + favoritePlacesLocal.length);
  for(i=0; i < favoritePlacesLocal.length; i++) {
    var button = document.createElement("button");
    button.textContent = favoritePlacesLocal[i][0];
    console.log(favoritePlacesLocal[i][1]);
    button.setAttribute("class","text-white mt-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
    var temp = favoritePlacesLocal[i][1];
    console.log(temp);
    forceListener(button, favoritePlacesLocal[i][1])
    console.log(button);
    favoriteBar.appendChild(button);
  }
}

// function that generates button for favorited locations
function makeFavButton(){
  var button = document.createElement("button");
  button.textContent = favoritePlacesLocal[i][0];
  console.log(favoritePlacesLocal[i][1]);
  button.setAttribute("class","text-white mt-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
  var temp = favoritePlacesLocal[i][1];
  console.log(temp);
  forceListener(button, favoritePlacesLocal[i][1])
  console.log(button);
  favoriteBar.appendChild(button);
}

//forces the add event listener to favorited button
function forceListener(button, place_id){
  button.addEventListener("click", function() {
    getPlaceDetails(place_id);
  })
}

//clears the location of saved favorited buttons
function clearFavBar(){
  while (favoriteBar.firstChild) {
    favoriteBar.removeChild(favoriteBar.firstChild);
  }
}

/**
 * recieves name and place to store into local storage
 * @param {*} name 
 * @param {*} place_id 
 */
function setLocalStorage(name, place_id) {
  console.log("in set local storage. saving " + name);
  console.log("before = " + JSON.stringify(favoritePlacesLocal));
  var bool = true;
  for (var i = 0; i < favoritePlacesLocal.length; i++){
    if (favoritePlacesLocal[i][1] == place_id){
      bool = false;
    }
  }
  if (bool){
    console.log("no match so adding");
    favoritePlacesLocal.push([name,place_id]);
    localStorage.setItem('dogsGoneWild', JSON.stringify(favoritePlacesLocal));
    console.log(JSON.stringify(favoritePlacesLocal));
    clearFavBar();
    renderFavBar();
  }
}

/**
 * removes place is from local storage
 * @param {} place_id 
 */
function removeFromLocalStorage(place_id){
  console.log("in remove from local");
  console.log("place id = " + place_id);
  // return value
  var temp = [];

  for (var i = 0; i < favoritePlacesLocal.length; i++){
    if (favoritePlacesLocal[i][1] == place_id){
      console.log("we have a match");
      favoriteBar.removeChild(favoriteBar.childNodes[i]);
    }
    else{
      temp.push(favoritePlacesLocal[i]);
    }
  }
  
  favoritePlacesLocal = temp;
  localStorage.setItem('dogsGoneWild',JSON.stringify(favoritePlacesLocal));

  // console.log("temp = " + temp);
  // console.log("favoritePlacesLocal = " + favoritePlacesLocal);
  // console.log("local storage = " + JSON.stringify(favoritePlacesLocal));
 
}