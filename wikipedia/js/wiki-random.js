/*
1. Can I use an iframe on large screens
and use a new page on smaller screens?

2. Hide the intro and pills on click.
Replace intro with bluepill or redpill text

*/

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=%2A&prop=extracts&generator=random&exsentences=10&grnnamespace=0&indexpageids=",
    "type": "GET"
};

function randomArticle() {
  $.ajax(settings).done(function(response) {
      var pageID = "";
      var title = "";
      var extract = "";

      pageID = response.query.pageids[0];
      title = response.query.pages[0].title;
      extract = response.query.pages[0].extract;
      console.log("Page ID: " + pageID);
      console.log("Title: " + title);
      console.log("Extract: " + extract);

      $("#first-screen").hide();
      $("#results").empty().append('Page Title: ' + title + '<br><br>' + 'Page Intro: ' + extract + '<br><br>' + 'Would you like to <a href="#" id="continue-next" class="intro-menu">[c]ontinue</a> to the page or go <a href="#" id="back" class="intro-menu">[b]ack</a> to the main menu? ===> <span class="cursor">_</span>');

      $(document).keydown(function(event) {
          if (event.which === 67) {
              continueNext();
          } else if (event.which === 66) {
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
    searchWikipedia();
  } else if (event.which === 50) {
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
      searchWikipedia();
    });
  });


/*
Use https://en.wikipedia.org/?curid=18630637 to load article with page_id that is returned from random api call
*/
