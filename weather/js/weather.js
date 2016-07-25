
function loadWeather(pos) {
  $.simpleWeather({
    location: pos,
    units: "f",
    success: function(weather) {
      console.log(weather);
      //document.getElementById("temp").innerHTML += weather.temp;

      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<img src="'+weather.image+'">';

      $("#weather").html(html);

    },
    error: function(error) {
      console.log(error);
    }
  });
}
