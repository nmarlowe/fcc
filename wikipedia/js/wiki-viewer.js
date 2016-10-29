//***************************
//    Start Search Logic
//***************************

var searchTerms = "";
var searchUrl = "";
var searchTitle = "";

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
              //window.location.href = searchLinks[0];
              console.log(searchTitles[0]);
              searchTitle = "";
              searchTitle = searchTitle[0];
              searchArticle();
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

var searchSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&indexpageids=&exintro=1&titles=" + searchTitle,
  "type": "GET"
};

// "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&indexpageids=&exintro=1&titles=" + searchTitle,

// "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&grnnamespace=0&indexpageids=&exintro=1",


function searchArticle() {
  //TODO: Can I put settings in here to set either the pagids or generator=random?
  $.ajax(searchSettings).done(function(response) {
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
              continueNext();
          } else if (event.which === 77) {
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
  //TODO: Can I put settings in here to set either the pagids or generator=random?
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
              continueNext();
          } else if (event.which === 77) {
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
