// searchTerms = word1+word2

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&formatversion=latest&origin=%2A&search=" + searchTerms,
    "type": "GET"
};

function searchWikipedia() {
  $("#first-screen").hide();
  $("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" autofocus>');
}
