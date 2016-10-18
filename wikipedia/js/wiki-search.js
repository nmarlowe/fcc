// searchTerms = word1+word2
var searchTerms = "";
var searchUrl = "";

var searchSettings = {
    "async": true,
    "crossDomain": true,
    "url": searchUrl,
    "type": "GET"
};

function searchWikipedia(url) {
  $.ajax(url).done(function(response) {
    console.log(searchSettings.url);
    var pageId = response.query.pages[0].pageid;
    var title = response.query.pages[0].title;
    var pageLink = "https://en.wikipedia.org/?curid=" + pageId;
    console.log(title);
    $("#results").empty().append('<div class="select"><p>Select one of the following:</p></div>');
    $("#results").append('<ol><li><a class="menu-item" href="' + pageLink + '">' + title + '</a></li></ol>');
  });
}

function readInput(el, e) {
  if (e.keyCode === 13) {
    searchTerms = el.value;
    searchUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=%2a&prop=extracts&generator=search&formatversion=latest&exsentences=1&exlimit=1&exintro=1&gsrsearch=" + searchTerms;
    console.log(searchUrl);
    searchWikipedia(searchUrl);
  }
}

function startSearch() {
  $("#first-screen").hide();
  $("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>');


}
