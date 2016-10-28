
// var urlSettings = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&exsentences=10&grnnamespace=0&indexpageids=";
//
// function setUrl(url) {
//   if (url === null) {
//     urlSettings =   "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&exsentences=10&grnnamespace=0&indexpageids=";
//   } else {
//     urlSettings = url;
//   }
// }
// console.log(urlSettings);
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&grnnamespace=0&indexpageids=&exintro=1",
    "type": "GET"
};

function randomArticle() {
  //TODO: Can I put settings in here to set either the pagids or generator=random?
  $.ajax(settings).done(function(response) {
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
      // var html = 'Page Title: ' + title + '<br><br>' + 'Page Intro: <br>' + extract;
      // html += '<br><img class="dither" id="target" src="https://upload.wikimedia.org/wikipedia/commons/d/d6/STS120LaunchHiRes-edit1.jpg" crossorigin="anonymous"/>';
      // html += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>';
      // html += '<script type="text/javascript" src="js/ditherjs.js"></script>';
      // html += '<script type="text/javascript" src="js/jquery.ditherjs.js"></script>';
      // html += '<script>';
      // html += '$(function() {';
      // html += 'console.log("ready");';
      // html += 'var options = {';
      // html += '"step":2,';
      // html += '"algorithm": "atkinson",';
      // html += '"monochrome": true,';
      // html += '"palette": [';
      // html += ';[0,0,0],'
      // html += '[170,187,153]';
      // html += ']';
      // html += '};';
      // html += '$(".dither").ditherJS(options);';
      // html += '});';
      // html += '</script>';
      // $("#results").empty().append(html);
      // html += '<br><br>';
      // html += 'Would you like to go <a href="#" id="continue-next" class="intro-menu">[p]roceed</a> to the page or go back to the <a href="#" id="back" class="intro-menu">[m]ain</a> to the menu? ===> <span class="cursor">_</span>';
      // $("#results").append(html);
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
