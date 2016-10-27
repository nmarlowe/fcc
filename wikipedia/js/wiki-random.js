
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&exsentences=10&grnnamespace=0&indexpageids=",
    "type": "GET"
};

function randomArticle() {
  $.ajax(settings).done(function(response) {
      var pageID = "";
      var title = "";
      var extract = "";
      var pageImage = "";

      pageID = response.query.pageids[0];
      title = response.query.pages[0].title;
      extract = response.query.pages[0].extract;
      pageImage = response.query.pages[0].thumbnail["original"];
      console.log("Page ID: " + pageID);
      console.log("Title: " + title);
      console.log("Extract: " + extract);
      console.log("Page Images: " + pageImage);

      $("#first-screen").hide();
      $("#results").empty().append('Page Title: ' + title + '<br><br>' + 'Page Intro: ' + extract + '<br><br>' + 'Would you like to go <a href="#" id="continue-next" class="intro-menu">[p]roceed</a> to the page or go back to the <a href="#" id="back" class="intro-menu">[m]ain</a> to the menu? ===> <span class="cursor">_</span>');

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
