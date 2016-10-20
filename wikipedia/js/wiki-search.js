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
    //TODO: Bad search term (wallpos instead of wallops) returns nothing
    $("#results").empty().append('<div class="select"><p>Select one of the following:</p></div>');
    var searchResults = response.query.pages;
    var html = '<ol type="a">';
    searchResults.forEach(function (item, index, array) {
      html += '<li><a id="'+index+'" class="menu-item" href="https://en.wikipedia.org/?curid=' + item.pageid + '">' + item.title + '</a></li>';
    });

    html += '<li><a href="#" id="back" class="menu-item">Main menu</a></li>';
    html += '</ol>';
    html += '<div class="command-prompt"><p>Selection or command</p>';
    html += '<p>===> <span class="cursor">_</span></p></div>';
    $("#results").append(html);

    //TODO: Simulated clicks aren't working, but alert will fire on key press
    $(document).keydown(function(event) {
        if (event.which === 65) {
          //alert("a");
            //$("#0").click();
            //TODO: pageid isn't being added
            window.location.href = "https://en.wikipedia.org/?curid=' + response.query.pages[0].pageid + '"
        } else if (event.which === 66) {
            $("#1").click();
        } else if (event.which === 77) {
          location.reload();
        }
    });
  });


}
// TODO: This isn't working
$(function() {
    $("#back").click(function(e) {
      e.preventDefault(); // if desired...
      location.reload();
    });
  });


function readInput(el, e) {
  if (e.keyCode === 13) {
    if (el.value === "") {
      window.open("https://onetoday.google.com/home/projects?utm_source=ifg", "_self");
    } else {
      searchTerms = el.value;
      searchUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=%2a&prop=extracts&generator=search&formatversion=latest&gsrlimit=5&exsentences=1&exlimit=1&exintro=1&gsrsearch=" + searchTerms;
      console.log(searchUrl);
      searchWikipedia(searchUrl);
    }
  }
}

function startSearch() {
  $("#first-screen").hide();
  $("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>');
}

//TODO: Keypress is still listening after menu item selected. For example, After when typing search terms, if a character entered matches one being listened for, the event still fires. How do I turn off the listener after moving past that menu?
