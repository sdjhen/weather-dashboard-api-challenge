const apiKey = '7a84ec1f7e90f000154659becdcca8be';

// Search form event
$('#search-form').on('submit', function (e) {
  e.preventDefault();

  const userInput = $('#search-input').val();
  const queryURL =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    userInput +
    '&limit=5&appid=' +
    apiKey;

  // Geolocation API Call
  $.ajax({ url: queryURL }).then(function (response) {
    console.log(response);

    // Get lat and long for forecast API
    const lat = response[0].lat;
    const lon = response[0].lon;

    console.log(lat, lon);

    // Weather forecast API Call
    wForecastQueryURL =
      'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      apiKey;
    $.ajax({ url: wForecastQueryURL }).then(function (forecastResponse) {
      console.log(forecastResponse);
    });
  });
});
