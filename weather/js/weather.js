
function loadWeather(pos) {
  $.simpleWeather({
    location: pos,
    units: "f",
    success: function(weather) {
      console.log(weather);
      //document.getElementById("temp").innerHTML += weather.temp;

      html = '<h2>Current Weather For '+weather.city+', '+weather.region+'</h2>';
      html += '<h4><i class="icon-'+weather.code+'"></i>'+weather.currently+'</h4>';
      html += '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2><br>';
      html += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;'+weather.high+'&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;'+weather.low+'</h4>';

      $("#weather").html(html);

    },
    error: function(error) {
      console.log(error);
      html = '<h2>'+error+'</h2>';

      $("#weather").html(html);
    }
  });
}
