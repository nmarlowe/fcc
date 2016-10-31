//***************************
//    Start Search Logic
//***************************

var searchTerms = "";
var searchUrl = "";
var searchTitle = "";
var searchResultUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&indexpageids=&exintro=1&titles=";

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

      $(document).keydown(function(event) {

          if (event.which === 65) {
            // a key
              searchTitle = "";
              searchTitle = searchTitles[0];
              searchResultUrl += searchTitle;
              setSearchSettings(searchResultUrl);
          } else if (event.which === 66) {
            // b key
              searchTitle = "";
              searchTitle = searchTitles[1];
              searchResultUrl += searchTitle;
              setSearchSettings(searchResultUrl);
          } else if (event.which === 67) {
            // c key
            searchTitle = "";
            searchTitle = searchTitles[2];
            searchResultUrl += searchTitle;
            setSearchSettings(searchResultUrl);
          } else if (event.which === 68) {
            // d key
            searchTitle = "";
            searchTitle = searchTitles[3];
            searchResultUrl += searchTitle;
            setSearchSettings(searchResultUrl);
          } else if (event.which === 69) {
            // e key
            searchTitle = "";
            searchTitle = searchTitles[4];
            searchResultUrl += searchTitle;
            setSearchSettings(searchResultUrl);
          } else if (event.which === 70) {
            // f key
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
      // if enter is pressed with no characters typed, send to onetoday charity page
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

var searchSettings = {
  "async": true,
  "crossDomain": true,
  "type": "GET"
};

function setSearchSettings(link) {
  // add link from menu item selected to add url to ajax search settings
  searchSettings["url"] = link;
  searchArticle();
}

function searchArticle() {

  $.ajax(searchSettings).done(function(response) {
      var pageID = "";
      var title = "";
      var extract = "";
      var pageImage = "";

      pageID = response.query.pageids[0];
      title = response.query.pages[0].title;
      extract = response.query.pages[0].extract;
      if (response.query.pages[0].hasOwnProperty("thumbnail")) {
        pageImage = response.query.pages[0].thumbnail["original"];

      } else {
        // no image returned placeholder
        pageImage = "img/mischief.jpg";
      }

      console.log("Page ID: " + pageID);
      console.log("Title: " + title);
      console.log("Extract: " + extract);
      console.log("Page Images: " + pageImage);

      $("#first-screen").hide();
      $("#results").empty().append('Page Title: ' + title + '<br><br>' + 'Page Intro: ' + extract + '<br><br><img class="dither img-responsive" id="target" src="' + pageImage + '" crossorigin="anonymous"/><script type="text/javascript" src="dist/ditherjs.min.js"></script><script type="text/javascript" src="dist/jquery.ditherjs.js"></script><script>$(function() {console.log("ready");var options = {"step":1,"algorithm": "atkinson","monochrome": true,"palette": [[0,0,0],[255,255,255]]};$(".dither").ditherJS(options);});</script><br><br>' + 'Would you like to go <a href="#" id="continue-next" class="intro-menu">[p]roceed</a> to the page or go back to the <a href="#" id="back" class="intro-menu">[m]ain</a> to the menu? ===> <span class="cursor">_</span>');

      $(document).keydown(function(event) {
          if (event.which === 80) {
            // p key for proceed
              continueNext();
          } else if (event.which === 77) {
            // m key for main menu
              back();
          }
      });
      $(function() {
          $("#continue-next").click(function(e) {
            e.preventDefault(); // if desired...
            continueNext();
          });
        });

      $(function() {
          $("#back").click(function(e) {
            e.preventDefault(); // if desired...
            back();
          });
        });

      function continueNext(){
        window.open("https://en.wikipedia.org/?curid=" + pageID, "_self");
      }

      function back() {
        location.reload();
      }
  });
}

//***************************
//    Start Random Logic
//***************************

var randomSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&grnnamespace=0&indexpageids=&exintro=1",
    "type": "GET"
};


function randomArticle() {

  $.ajax(randomSettings).done(function(response) {
      var pageID = "";
      var title = "";
      var extract = "";
      var pageImage = "img/mischief.jpg";

      pageID = response.query.pageids[0];
      title = response.query.pages[0].title;
      extract = response.query.pages[0].extract;
      if (response.query.pages[0].hasOwnProperty("thumbnail")) {
        pageImage = response.query.pages[0].thumbnail["original"];

      } else {
        pageImage = "img/mischief.jpg";
      }

      console.log("Page ID: " + pageID);
      console.log("Title: " + title);
      console.log("Extract: " + extract);
      console.log("Page Images: " + pageImage);

      $("#first-screen").hide();
      $("#results").empty().append('Page Title: ' + title + '<br><br>' + 'Page Intro: ' + extract + '<br><br><img class="dither img-responsive" id="target" src="' + pageImage + '" crossorigin="anonymous"/><script type="text/javascript" src="dist/ditherjs.min.js"></script><script type="text/javascript" src="dist/jquery.ditherjs.js"></script><script>$(function() {console.log("ready");var options = {"step":1,"algorithm": "atkinson","monochrome": true,"palette": [[0,0,0],[255,255,255]]};$(".dither").ditherJS(options);});</script><br><br>' + 'Would you like to go <a href="#" id="continue-next" class="intro-menu">[p]roceed</a> to the page or go back to the <a href="#" id="back" class="intro-menu">[m]ain</a> to the menu? ===> <span class="cursor">_</span>');

      $(document).keydown(function(event) {
          if (event.which === 80) {
            // p key for proceed
              continueNext();
          } else if (event.which === 77) {
            // m key for main menu
              back();
          }
      });
      $(function() {
          $("#continue-next").click(function(e) {
            e.preventDefault(); // if desired...
            continueNext();
          });
        });

      $(function() {
          $("#back").click(function(e) {
            e.preventDefault(); // if desired...
            back();
          });
        });

      function continueNext(){
        window.open("https://en.wikipedia.org/?curid=" + pageID, "_self");
      }

      function back() {
        location.reload();
      }
  });
}

$(document).keydown(function(event) {

  if (event.which === 49) {
    //turns off event listener for main menu
    $(document).off("keydown");
    startSearch();
  } else if (event.which === 50) {
    $(document).off("keydown");
    randomArticle();
    }
});

$(function() {
    $("#menu-2").click(function(e) {
      e.preventDefault(); // if desired...
      randomArticle();
    });
  });

$(function() {
    $("#menu-1").click(function(e) {
      e.preventDefault(); // if desired...
      startSearch();
    });
  });
