var input = document.querySelector("#search-input")
var button = document.querySelector("#search-button")
var modalEL = document.getElementById("defaultModal")
var modalTitle = document.getElementById("modalTitle")
var modalPicture = document.getElementById("modalPicture")
var closeBtnEl =document.getElementById("close");
var lat;
var lng;
input.addEventListener("keypress",locationPicked)
button.addEventListener("click",locationPicked)

var googleApiKey = "AIzaSyAIDjXvF9NUyB43bLbgtB83A9zYc5Tl2qI";

/**
 * Creates a location object for use later
 * @param {string} name 
 * @param {string} place_id 
 * @param {string} photoRef 
 * @param {int} rating 
 */
function parkLocation(name, place_id, photoRef, rating){
  this.name = name; 
  //this.idOpen ??
  this.place_id = place_id;
  this.photoRef = photoRef;
  this.imagesrc = getImageReference(photoRef);
  this.rating = rating;
}

// two ways to call this function: hitting 'enter' or click 'search'
function locationPicked(e) {
  var location = placesAPI()
  console.log(location)
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
  header.setAttribute("style","height:38%;width:100%")
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

/**
 * Calls the getWeather call for input lat and lng and then renders the 
 * objects into the weather dashboard
 * @param {int} lat 
 * @param {int} lng 
 */
function renderWeather(lat,lng){
  latLng = lat + ", " + lng
  // get list of current weather forcast
  //var currentWeather = getWeather(latLng);
  var currentWeather = getTestWeather(latLng);
  // NEED TO FIGURE OUT HOW TO GET TIME FOR EACH HOUR!!
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
    console.log("current hour is " + hour);
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

function getTestWeather(location){
  var ret = [];
  ret.push([70.47,1102]);
  ret.push([67.28,1102]);
  ret.push([64.26,1000]);
  ret.push([62.61,1001]);
  ret.push([60.89,1101]);
  return ret;
}

//getImageReference("AUjq9jlTyidRtwiBxwaHLqPvlNHSh2d66EFqgqGcGXXVE2Uje7wLWdNL84dB1EE3EOx12wTXvc0m3DWvFiu0Lb7SLw6b1X9pzJXQf4aH45aT3rl2hM3THQzx2atTRU3ixIimBgPoY2vkIFuk2XPjloLjkGXjJPEdN6YFQA2qJb6puiizT9wL");
async function getImageReference(photoRef){
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  // &key=
  const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoRef + '&key=' + googleApiKey, options);
  
  // check that response was not okay 
  console.log(response);
  //if (!response.ok) {
  //  throw new Error("problem with");
  //}
  //const jsonData = await response.json();
  
  // log response
  //console.log(response);
  //console.log(jsonData);
  
  //var ret = [];
  // for each hour we want the temperature, weatherCode 
 
  //return ret;
  return "image url here";
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
// Places API Autofill */
// following function creates an autofill for the "search-input"
// the criteria is restricted to cities in the us
///////////////////////////////////

window.addEventListener("load",placesAPI)
function placesAPI() {
  //var input = document.getElementById("search-input");
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
    //mapsAPI(lat,lng)
    renderWeather(lat, lng)
    window.initMap = getNearByLocations(lat,lng)
  })
  return autocomplete
} 

///////////////////////////////////
// Maps API 
///////////////////////////////////

function mapsAPI(latitude,longitude) {
  var lat = latitude;
  var lng = longitude;
  // i did not change anyting below this line in a long time
  var radius = 32186.9; // 20 miles in meters
  var type = 'park';
  var apiKey = 'AIzaSyAIDjXvF9NUyB43bLbgtB83A9zYc5Tl2qI';
  var request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`
  fetch(request)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("respone error !== 200")
      }
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      var city = document.querySelector(".city")
      var date = document.querySelectorAll(".date")
      var code = document.querySelectorAll(".code")
      var temp = document.querySelectorAll(".temp")
      var wind = document.querySelectorAll(".wind")
      var humidity = document.querySelectorAll(".humidity")
      city.textContent = name
      for (i=0 ; i<date.length ; i++) {
        date[i].textContent = dayjs().add(i,"day",i).format("ddd")
        temp[i].textContent = parseInt(data.hourly.temperature_2m[24*i]) + data.hourly_units.temperature_2m
        wind[i].textContent = parseInt(data.hourly.windspeed_10m[24*i]) + " " + data.hourly_units.windspeed_10m
        humidity[i].textContent = parseInt(data.hourly.relativehumidity_2m[24*i]) + data.hourly_units.relativehumidity_2m
      }
    });
}

////////////////
/* Test stuff */
////////////////
// getNearByLocations2(43.0721661, -89.4007501);
//getPlaceDetails("ChIJ6ZCmmwkZBYgRwddsM097k6g", '{"lat": 43.0490129,"lng": -87.9015714}');
getPlaceDetails("ChIJS2SkF39TBogRTsRYE0xQUXM", '{"lat": 43.0490129,"lng": -87.9015714}');



////////////////////////////
/* Test weather api stuff */
////////////////////////////
var map;
var modalMap;
var service;
var infowindow;

function getNearByLocations(latitude, longitude) {
  console.log("inside get nearby locations 2");

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
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(JSON.stringify(results))
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var jsonResults = results;
    var ret = [];
    // for each hour we want the temperature, weatherCode 
    for (var i = 0; i < jsonResults.length; i++){
      createMarker(results[i]);
    }
    map.setCenter(results[0].geometry.location);
    console.log(JSON.stringify(ret));
    return ret;
  }
}

function createMarker(place){
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    label: place.rating + "",
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    console.log("clicked an object")
    getPlaceDetails(place.place_id, place.geometry.location);
  });

}

function getPlaceDetails(place_id, location){
  modalMap = new google.maps.Map(document.getElementById("modalMap"), {
    center: location,
    zoom: 15,
  });
  const request = {
    placeId: place_id,
    //fields: ["name","formatted_address","formatted_phone_number","rating","website","photos"]
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
      // get the first picture and add to modal
      var photos = place.photos; // can we limit this?
      modalPicture.setAttribute("src", photos[0].getUrl())
      // set title into modal
      modalTitle.textContent = place.name;
      // modal address? place.formatted_address
      // modal phone number? place.formatted_phone_number
      // modal rating? place.rating
      // modal website? place.website
      console.log(JSON.stringify(place));
    }
  })
}

function favorate(){

}
