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
  "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&exsentences=5&grnnamespace=0",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "7dd310e6-893b-e6c7-ba15-c4169e1df76a"
  }
};

$.ajax(settings).done(function (response) {
  var pageID = "";

  pageID = String(Object.keys(response.query.pages));
  //pageTitle = Object.keys(response.query.pages.pageID.title);
  //console.log(pageTitle);
  alert(pageID);
});

/*
Use https://en.wikipedia.org/?curid=18630637 to load article with page_id that is returned from random api call
*/
