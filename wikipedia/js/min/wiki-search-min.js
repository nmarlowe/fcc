function searchWikipedia(e){$.ajax(e).done(function(e){$("#results").empty().append('<div class="select"><p>Select one of the following:</p></div>');var a=e.query.pages,i='<ol type="a">';a.forEach(function(e,a,r){i+='<li><a id="'+a+'" class="menu-item" href="https://en.wikipedia.org/?curid='+e.pageid+'">'+e.title+"</a></li>"}),i+='<li><a href="#" id="back" class="menu-item">Main menu</a></li>',i+="</ol>",i+='<div class="command-prompt"><p>Selection or command</p>',i+='<p>===> <span class="cursor">_</span></p></div>',$("#results").append(i),$(document).keydown(function(e){65===e.which?window.location.href="https://en.wikipedia.org/?curid=' + response.query.pages[0].pageid + '":66===e.which?$("#1").click():77===e.which&&location.reload()})})}function readInput(e,a){13===a.keyCode&&(""===e.value?window.open("https://onetoday.google.com/home/projects?utm_source=ifg","_self"):(searchTerms=e.value,searchUrl="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=%2a&prop=extracts&generator=search&formatversion=latest&gsrlimit=5&exsentences=1&exlimit=1&exintro=1&gsrsearch="+searchTerms,console.log(searchUrl),searchWikipedia(searchUrl)))}function startSearch(){$("#first-screen").hide(),$("#results").empty().append('What would you like to search for? ===> <input type="text" id="searchInput" name="search" onkeydown="readInput(this, event)" autofocus>')}var searchTerms="",searchUrl="",searchSettings={async:!0,crossDomain:!0,url:searchUrl,type:"GET"};$(function(){$("#back").click(function(e){e.preventDefault(),location.reload()})});