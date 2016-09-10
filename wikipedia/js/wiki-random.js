/*
1. Can I use an iframe on large screens
and use a new page on smaller screens?

2. Hide the intro and pills on click.
Replace intro with bluepill or redpill text

*/


$(function() {
  $(".bluepill").click(function() {
    $(".bluepill").addClass("animated zoomOut");
    $(".choices").delay(2000)
    .animate({opacity: '0'}, 'slow');
  });
})
