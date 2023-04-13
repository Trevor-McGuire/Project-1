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

  // clear anything from <aside>
  aside.textContent = '';

  // change heights and widths
  header.setAttribute("style","height:10%;width:100%")
  aside.setAttribute("style","height:90%;width:10%")
  main.setAttribute("style","height:90%;width:90%")

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