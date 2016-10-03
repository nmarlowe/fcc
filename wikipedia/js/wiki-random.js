/*
1. Can I use an iframe on large screens
and use a new page on smaller screens?

2. Hide the intro and pills on click.
Replace intro with bluepill or redpill text

*/

$(document).keydown(function(event){
  if (event.which === 49) {
    alert("Key 1 Pressed");
  } else if (event.which === 50) {
    window.open("https://en.wikipedia.org/wiki/Special:RandomRootpage", "_self");
  }
});

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts&generator=random&exsentences=10&grnnamespace=0&indexpageids=",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "f3442c5d-b749-bf3a-f58c-5d5c77ed697f"
  }
};

$.ajax(settings).done(function (response) {
  var pageID = "";
  var title = "";
  var extract = "";

  pageID = response.query.pageids[0];
  title = response.query.pages[0].title;
  extract = response.query.pages[0].extract;
  //pageTitle = Object.keys(response.query.pages.pageID.title);
  //console.log(pageTitle);
  console.log("Page ID: " + pageID);
  console.log("Title: " + title);
  console.log("Extract: " + extract);
});

/*
Use https://en.wikipedia.org/?curid=18630637 to load article with page_id that is returned from random api call
*/
