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

  // clear anything from <aside> and <main>
  aside.textContent = '';
  main.textContent = '';

  // change heights and widths
  header.setAttribute("style","height:10%;width:100%")
  aside.setAttribute("style","height:90%;width:0%")
  main.setAttribute("style","height:90%;width:100%")

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
  header.setAttribute("style","height:10%;width:100%")
  aside.setAttribute("style","height:90%;width:50%")
  main.setAttribute("style","height:90%;width:50%")

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

    const response = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=' + location + '&timesteps=hourly&units=imperial&apikey=KpAGFgRmxnfvYhtHvLxCZNTAlIPAffIV', options);
    
    // check that response was not okay
    if (!response.ok) {
      throw new Error("problem with");
    }
    const jsonData = await response.json();
    
    // log response
    console.log(response);
    console.log(jsonData);
    
    // response should contain 

    for (var i = 0; i < 5; i++){
      var temp = jsonData.timelines.hourly[i].values.temperature;
      console.log(temp);
    }


}

//getWeather("milwaukee");