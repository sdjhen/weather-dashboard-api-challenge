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
      const forecastList = forecastResponse.list;

      // Now Forecast
      const today = forecastList[0];
      const todayTimeStamp = today.dt;

      // API responses for today weather
      const todayDate = moment.unix(forecastList[0].dt).format('MM/DD/YYYY');
      const todayTemp = forecastList[0].main.temp;
      const todayWind = forecastList[0].wind.speed;
      const todayHumidity = forecastList[0].main.humidity;

      // Render Today API responses in HTML Container
      $('#today-weather').append(
        $(`<div id="now-forecast">
        <h2>${userInput} <span>${todayDate}</span></h2>
     <p>Temp: ${todayTemp} °C</p>
     <p>Wind: ${todayWind} KPH</p>
     <p>Humidity: ${todayHumidity} %</p>
             </div> `)
      );

      // 5 day Forecast

      for (let i = 1; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];

        // Put 5 day forecast in HTML container
      }
    });
  });
});
