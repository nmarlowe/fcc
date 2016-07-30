var lat, lon;
var metric = false;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat + "," + lon);
    loadWeather(lat + "," + lon, "f");
  },
  function (error) {
    if (error.code == error.PERMISSION_DENIED){
        console.log("Geolocation Denied");
        loadWeather(prompt("Enter your postal code"));
      }
  });
} else {
  console.log("Geolocation not supported in your browser");
  loadWeather(prompt("Enter your postal code"));
}

function loadWeather(pos, unit) {
  $.simpleWeather({
    location: pos,
    unit: unit,
    success: function(weather) {
      console.log(weather);

      $("#loading").hide();
      $("#location").html("<h2>Current Weather For " + weather.city + ", " + weather.region+'<h2>');
      $("#current-icon").html('<h2><i class="wi wi-yahoo-' + weather.code +'"></i>&nbsp;' + weather.currently + '&nbsp; | &nbsp;' + weather.temp + '&deg;' + weather.units.temp + ' </h2><br>');
      $("#sunrise").html('<h4><i class="wi wi-sunrise"></i> ' + weather.sunrise + '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<i class="wi wi-sunset"></i> ' + weather.sunset + '</h4>');

      changeForecast();

      todayForecast = '<h4>Today: &nbsp;<i class="wi wi-yahoo-'+weather.forecast[0].code+'"></i>&nbsp;'+weather.forecast[0].text+'</h4><br>';
      todayForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;<span id="todayHigh">'+weather.high+'</span>&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;<span id="todayLow">'+weather.low+'</span></h4>';

      tomorrowForecast = '<h4>Tomorrow: &nbsp;<i class="wi wi-yahoo-'+weather.forecast[1].code+'"></i>&nbsp;'+weather.forecast[1].text+'</h4><br>';
      tomorrowForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;<span id="tomorrowHigh">'+weather.forecast[1].high+'</span>&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;<span id="tomorrowLow">'+weather.forecast[1].low+'</span></h4>';

      var today = true;
      //var nIntervId;

       $("#forecast").html(todayForecast);

       /************
       Rotates forcast between today and tomorrow every 5 seconds
       ************/

      function changeForecast() {
        var nIntervId = setInterval(forecast, 5000);
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

// /************
// Changes from Fahrenheit to Celsius
// FIXME: Messes up the rotating forecast!!!!
// ************/
//
// $("#units").click(function() {
//   if (metric === false) {
//     loadWeather(lat + "," + lon, "c");
//     metric = true;
//     $("#units").html("Fahrenheit?");
//   } else {
//     loadWeather(lat + "," + lon, "f");
//     metric = false;
//     $("#units").html("Celsius?");
//   }
//});
