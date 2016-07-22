
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude + "," + position.coords.longitude)
    loadWeather(position.coords.latitude + "," + position.coords.longitude);
  });
}
