/*
1. Can I use an iframe on large screens
and use a new page on smaller screens?

2. Hide the intro and pills on click.
Replace intro with bluepill or redpill text

*/

$(document).keydown(function(event){
  if (event.which == 49) {
    alert("Key 1 Pressed");
  } else if (event.which == 50) {
    window.open("https://en.wikipedia.org/wiki/Special:RandomRootpage", "_self");
  }
})


/*
Use https://en.wikipedia.org/?curid=18630637 to load article with page_id that is returned from random api call
*/
