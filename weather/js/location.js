if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude + "," + position.coords.longitude);
    loadWeather(position.coords.latitude + "," + position.coords.longitude)
  },
  function (error) {
    if (error.code == error.PERMISSION_DENIED)
        console.log("you denied me :-(");
        html = '<h2>You must allow location services in your browser</h2>';
        $("#weather").html(html);
  });
} else {
  console.log("Geolocation not supported in your browser");
  html = '<h2>Geolocation is not supported in your browser</h2>';
  $("#weather").html(html);
}
