if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude + "," + position.coords.longitude);
    loadWeather(position.coords.latitude + "," + position.coords.longitude);
  },
  function (error) {
    if (error.code == error.PERMISSION_DENIED){
        console.log("you denied me :-(");
        //html = '<h2>You must allow location services in your browser</h2>';
        //$("#weather").html(html);
        loadWeather(prompt("Enter your postal code"));
      }
  });
} else {
  console.log("Geolocation not supported in your browser");
  //html = '<h2>Geolocation is not supported in your browser</h2>';
  loadWeather(prompt("Enter your postal code"));
  //$("#weather").html(html);
}

var metric = false;

function loadWeather(pos) {
  $.simpleWeather({
    location: pos,
    units: "f",
    success: function(weather) {
      console.log(weather);

      html = '<h2>Current Weather For '+weather.city+', '+weather.region+'</h2>';
      html += '<h4><i class="icon-'+weather.code+'"></i>&nbsp;'+weather.currently+'</h4>';
      html += '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2><br />';

      changeForecast();

      todayForecast = '<h4>Today: &nbsp;<i class="icon-'+weather.forecast[0].code+'"></i>&nbsp;'+weather.forecast[0].text+'</h4><br>';
      todayForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;'+weather.high+'&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;'+weather.low+'</h4>';

      tomorrowForecast = '<h4>Tomorrow: &nbsp;<i class="icon-'+weather.forecast[1].code+'"></i>&nbsp;'+weather.forecast[1].text+'</h4><br>';
      tomorrowForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;'+weather.forecast[1].high+'&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;'+weather.forecast[1].low+'</h4>';


      var today = true;
      var nIntervId;

      $("#weather").html(html);
      $("#forecast").html(todayForecast);

      function changeForecast() {
        nIntervId = setInterval(forecast, 5000);
      }

      function forecast() {
        if (today) {
          $("#forecast").html(todayForecast);
          today = false;
        } else {
          $("#forecast").html(tomorrowForecast);
          today = true;
        }
      }

    },
    error: function(error) {
      console.log(error);
      html = '<h2>'+error+'</h2>';
      $("#weather").html(html);
    }
  });
}

/*************
Reload page every 60 minutes
*************/

$(document).ready(function() {
    setInterval("location.reload(true)", 3600000);
});
