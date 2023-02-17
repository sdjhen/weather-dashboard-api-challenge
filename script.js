// Populate history from local storage
const history = JSON.parse(localStorage.getItem('history')) || []; // if empty

// Openweather API Key
const apiKey = '7a84ec1f7e90f000154659becdcca8be';

// Search form event
$('#search-form').on('submit', function (e) {
  e.preventDefault();

  // Reveal Today & 5 day forecast
  $('.to-show').show();

  const userInput = $('#search-input').val();
  const queryURL =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    userInput +
    '&limit=5&appid=' +
    apiKey;

  // Put search value on history list
  // prepend value to container

  // Add history to local storage
  history.push(userInput);
  localStorage.setItem('history', JSON.stringify(history));

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
      const todayDate = moment.unix(todayTimeStamp).format('MM/DD/YYYY');
      const todayTemp = today.main.temp;
      const todayWind = today.wind.speed;
      const todayHumidity = today.main.humidity;
      const iconCode = today.weather[0].icon;
      const iconURL = 'http://openweathermap.org/img/w/' + iconCode + '.png';

      // Render Today API responses in HTML Container
      $('#today-weather').append(
        $(`<div id="now-forecast">
        <h2>${userInput} <span>${todayDate}</span></h2>
        <img src="  ${iconURL} "></img> 
     <p>Temp: ${todayTemp} °C</p>
     <p>Wind: ${todayWind} KPH</p>
     <p>Humidity: ${todayHumidity} %</p>
             </div> `)
      );

      // 5 day Forecast

      for (let i = 1; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const forecastTimeStamp = forecast.dt;
        const forecastDates = moment
          .unix(forecastTimeStamp)
          .format('MM/DD/YYYY');
        const forecastTemp = forecast.main.temp;
        const forecastWind = forecast.wind.speed;
        const forecastHumidity = forecast.main.humidity;

        // Add weather icon to HTML

        const iconCode = forecast.weather[0].icon;
        const iconURL = 'http://openweathermap.org/img/w/' + iconCode + '.png';

        // Put 5 day forecast in HTML container
        $('#card-container').append(
          $(`
          <div class="card mt-2">
          <div class="card-body">
            <h4 class="card-title">${forecastDates}</h4>
            <img src="  ${iconURL} "></img> 
            <p class="card-text">Temp: ${forecastTemp} °C</p>
            <p class="card-text">Wind: ${forecastWind} KPH</p>
            <p class="card-text">Humidity: ${forecastHumidity}%</p>
             </div>
        </div>`)
        );
      }
    });
  });
});
