const apiKey = b1b87e0ba28bc9398c2b6c7f4ab58176;

// Search event & API call
$('#search-form').on('submit', function (e) {
  e.preventDefault();

  const userInput = $('#search-input').val();
  const queryURL =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    userInput +
    '&limit=5&appid=' +
    apiKey;
});
