// function getLocation(){
//   if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function(position) {
//         //$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
//         lat = position.coords.latitude;
//         lon = position.coords.longitude;
//
//         return {
//           lat: lat,
//           lon: lon
//         };
//
//
//       });
//   }
//
//
//   console.log(lat + ", " + lon);
// }

function getLat() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude);
      return position.coords.latitude;
    });
  }
}

function getLon() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.longitude);
      return position.coords.longitude;
    });
  }
}

var settings = {
  "async": true,
  "crossDomain": true,
  // "url": "https://api.forecast.io/forecast/5cf25ae33dfda0d56214351deb5401c9/" + navigator.geolocation.getCurrentPosition(function(position){return position.coords.latitude}) + "," +
  // navigator.geolocation.getCurrentPosition(function(position){return position.coords.latitude})
  // + "?exclude=minutely%2Chourly%2Cdaily",
  // "url": "https://api.forecast.io/forecast/5cf25ae33dfda0d56214351deb5401c9/" + getLat() + "," + getLon(),
  "url": "https://api.forecast.io/forecast/5cf25ae33dfda0d56214351deb5401c9/37.209655399999995,-77.46843899999999?exclude=minutely%2Chourly%2Cdaily",
  "method": "GET",
  "headers": {
     "cache-control": "no-cache",
     //"postman-token": "e7b5a911-57f9-87ea-dd81-e7c998ce4e9f"
   }
}

//console.log(settings.url);

$.ajax(settings).done(function (response) {
  console.log(getLat() + ", " + getLon());
  var temp = Math.ceil(response.currently.temperature);
  var feelsLike = Math.ceil(response.currently.apparentTemperature);

  document.getElementById("temp").innerHTML = '<h2>Outside Temperature: ' + temp + '</h2>';
  document.getElementById("feels-like").innerHTML = '<h2>Feels Like: ' + feelsLike + '</h2>';

});
