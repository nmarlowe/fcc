// if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function(position) {
//       $("#data").html("latitude: " + position.coords.latitude + "<br>longitutde: " + position.coords.longitude);
//     });
// }


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.forecast.io/forecast/5cf25ae33dfda0d56214351deb5401c9/37.209655399999995,-77.46843899999999?exclude=minutely%2Chourly%2Cdaily",
  "method": "GET",
  "headers": {
     "cache-control": "no-cache",
     "postman-token": "e7b5a911-57f9-87ea-dd81-e7c998ce4e9f"
   }
}

$.ajax(settings).done(function (response) {
  console.log(response);

  document.getElementById("temp").innerHTML = response.currently.temperature;
});
