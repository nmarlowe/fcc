var searchTerms = "";
var searchUrl = "";

function searchWikipedia(url) {
  $.ajax(url).done(function(response) {

      $("#results").empty().append('<div class="select"><p>Select one of the following:</p></div>');
      var searchTitles = response[1];
      var searchLinks = response[3];
      var searchResults = {};

      searchTitles.forEach(function(item, index) {
        searchResults[item] = searchLinks[index];
      });

      var html = '<ol type="a">';
      $.each(searchResults, function(index, value) {
        html += '<li><a class="menu-item" href="' + value + '">' + index + '</a></li>';
      });

      html += '<li><a href="#" id="back" class="menu-item">Main menu</a></li>';
      html += '</ol>';
      html += '<div class="command-prompt"><p>Selection or command</p>';
      html += '<p>===> <span class="cursor">_</span></p></div>';
      $("#results").append(html);

      //TODO: Make randomArticle have an optional argument that takes searchLinks[i] so that the search page looks like the random page with extracts and paigeimages. 
      $(document).keydown(function(event) {
          if (event.which === 65) {
              window.location.href = searchLinks[0];
          } else if (event.which === 66) {
              window.location.href = searchLinks[1];
          } else if (event.which === 67) {
              window.location.href = searchLinks[2];
          } else if (event.which === 68) {
              window.location.href = searchLinks[3];
          } else if (event.which === 69) {
              window.location.href = searchLinks[4];
          } else if (event.which === 70) {
              location.reload();
          }
      });
      $(function() {
          $("#back").click(function() {
            location.reload();
          });
        });
  });
}

function readInput(el, e) {
  if (e.keyCode === 13) {
    if (el.value === "") {
      window.open("https://onetoday.google.com/home/projects?utm_source=ifg", "_self");
    } else {
      searchTerms = el.value;
      searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=%2a&format=json&limit=5&formatversion=latest&search=" + searchTerms;
      searchWikipedia(searchUrl);
    }
  }
}

function startSearch() {
  $("#first-screen").hide();
  $("#footer").hide();
  $("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>');
}
