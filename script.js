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
  });
});
