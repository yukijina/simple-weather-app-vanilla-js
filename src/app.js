let apiKey = '2f5896dd4cc0cdo340203tba4fba205f';

// Search Input
let searchForm = document.querySelector('.form-container');

// Get input value
function getInputValue(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  getCity(city);
  getForecast(city);
}

// API
function getCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayCurrentWeather);
}

// Display to the page
function displayCurrentWeather(response) {
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

  currentTime.innerHTML = formatCurrentDate(date);
}

// Format date
function formatCurrentDate(date) {
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
getCity('San Francisco');
getForecast('San Francisco');

// Format corecast day
function formatForecastDate(data) {
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date(data.time * 1000);
  return days[date.getDay()];
}

// Forecast weather. Inject HTML from JS
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastData = response.data.daily;
  let forecastHTML = '';
  let forecastContainer = document.querySelector('#forecast');

  forecastData.forEach(function (data, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `
  <div class="day-container">
  <p class="forecast-day">${formatForecastDate(data)}</p>
  <div class="forecast-img-container">
    <img
      src=${data.condition.icon_url}
      alt=${data.condition.icon}
    />
  </div>
  <div class="forecase-temperature">
    <p>${Math.round(data.temperature.maximum)}°C</p>
    <p>${Math.round(data.temperature.minimum)}°C</p>
  </div>
</div>
`;
    }
  });
  forecastContainer.innerHTML = forecastHTML;
}

// Forecast API
function getForecast(city) {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(url);
  axios.get(url).then(displayForecast);
}
