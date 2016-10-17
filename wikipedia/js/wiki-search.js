// searchTerms = word1+word2
var searchTerms;

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchTerms,
    "type": "GET"
};
function readInput(el, e) {
  if (e.keyCode == 13) {
    searchTerms = el.value;
    searchWikipedia();
  }
}

function startSearch() {
  $("#first-screen").hide();
  $("#results").empty().append('What would you like to search for? ===> <input type="search" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>');

}

function searchWikipedia() {
  $.ajax(settings).done(function(response) {
    var title = response.query.pages.title;
    console.log(title);
  });
}
