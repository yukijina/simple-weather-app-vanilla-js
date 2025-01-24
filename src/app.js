let apiKey = '2f5896dd4cc0cdo340203tba4fba205f';

// Search Input
let searchForm = document.querySelector('.form-container');

// Get input value
function getInputValue(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  searchCity(city);
  searchForecast(city);
}

// API
function searchCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayResult);
}

// Display to the page
function displayResult(response) {
  let data = response.data;
  let date = new Date(data.time * 1000);
  let currentCityEl = document.querySelector('.current-city');
  let currentTemperatureEl = document.querySelector('.current-temperature');
  let currentHumidityEl = document.querySelector('.current-humidity');
  let currentWindEl = document.querySelector('.current-wind');
  let currentConditionEl = document.querySelector('.current-condition');
  let currentIconEl = document.querySelector('.current-icon');
  let currentTime = document.querySelector('.day-and-time');

  currentCityEl.innerHTML = data.city;
  currentTemperatureEl.innerHTML = Math.round(data.temperature.current);
  currentHumidityEl.innerHTML = data.temperature.humidity;
  currentWindEl.innerHTML = data.wind.speed;
  currentConditionEl.innerHTML = data.condition.description;
  currentIconEl.src = data.condition.icon_url;
  currentIconEl.alt = data.condition.icon;

  currentTime.innerHTML = formattedDate(date);
}

// Format date
function formattedDate(date) {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;

  return `${day} ${hour}:${minutes} `;
}

// Click button
searchForm.addEventListener('submit', getInputValue);

// Default city when the page is loaded
searchCity('San Francisco');
//searchForecast('San Francisco');

// Inject HTML from JS
function displayForecast() {
  let forecastHTML = '';
  let forecastDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let forecastContainer = document.querySelector('#forecast');

  forecastDays.forEach(function (day) {
    forecastHTML += `
  <div class="day-container">
  <p class="forecast-day">${day}</p>
  <div class="forecast-img-container">
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
      alt=""
    />
  </div>
  <div class="forecase-temperature">
    <p>15°C</p>
    <p>15°C</p>
  </div>
</div>
`;
  });
  forecastContainer.innerHTML = forecastHTML;
}

displayForecast();
// Forecast API

// function searchForecast(city) {
//   let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

//   axios.get(url).then();
// }
