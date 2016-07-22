
function loadWeather(pos) {
  $.simpleWeather({
    location: pos,
    units: "f",
    success: function(weather) {
      console.log(weather);
    },
    error: function(error) {
      console.log(error);
    }
  });
}
