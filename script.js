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
    // Get lat and long for forecast API
    const lat = response[0].lat;
    const lon = response[0].lon;

    // Weather forecast API Call
    wForecastQueryURL =
      'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      apiKey;
    $.ajax({ url: wForecastQueryURL }).then(function (forecastResponse) {
      //   console.log(forecastResponse);

      const forecastList = forecastResponse.list;

      // Now Forecast
      const today = forecastList[0];
      const todayTimeStamp = today.dt;
      console.log(today);
      // 5 day Forecast

      for (let i = 1; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];

        console.log(forecast);
      }
    });
  });
});
