function searchWikipedia(e){$.ajax(e).done(function(e){$("#results").empty().append('<div class="select"><p>Select one of the following:</p></div>');var i=e[1],o=e[3],a={};i.forEach(function(e,i){a[e]=o[i]}),console.log(a);var n='<ol type="a">';o.forEach(function(e,i){n+='<li><a id="'+i+'" class="menu-item" href="'+e+'">'+e+"</a></li>"}),n+='<li><a href="#" id="back" class="menu-item">Main menu</a></li>',n+="</ol>",n+='<div class="command-prompt"><p>Selection or command</p>',n+='<p>===> <span class="cursor">_</span></p></div>',$("#results").append(n),i.forEach(function(e,i,o){$("a [id=index]").text(e)}),$(document).keydown(function(e){65===e.which?window.location.href="https://en.wikipedia.org/?curid="+a[0].pageid:66===e.which?window.location.href="https://en.wikipedia.org/?curid="+a[1].pageid:67===e.which?window.location.href="https://en.wikipedia.org/?curid="+a[2].pageid:68===e.which?window.location.href="https://en.wikipedia.org/?curid="+a[3].pageid:69===e.which?window.location.href="https://en.wikipedia.org/?curid="+a[4].pageid:77===e.which&&location.reload()})})}function readInput(e,i){13===i.keyCode&&(""===e.value?window.open("https://onetoday.google.com/home/projects?utm_source=ifg","_self"):(searchTerms=e.value,searchUrl="https://en.wikipedia.org/w/api.php?action=opensearch&origin=%2a&format=json&limit=5&formatversion=latest&search="+searchTerms,console.log(searchUrl),searchWikipedia(searchUrl)))}function startSearch(){$("#first-screen").hide(),$("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>')}var searchTerms="",searchUrl="",searchSettings={async:!0,crossDomain:!0,url:searchUrl,type:"GET"};$(function(){$("#back").click(function(e){e.preventDefault(),location.reload()})});