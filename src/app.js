let apiKey = '2f5896dd4cc0cdo340203tba4fba205f';
// Search Input
let searchForm = document.querySelector('.form-container');

function getInputValue(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayResult);
}

function displayResult(response) {
  console.log(response.data);
  let data = response.data;
  let currentCityEl = document.querySelector('.current-city');
  let currentTemperatureEl = document.querySelector('.current-temperature');
  let currentHumidityEl = document.querySelector('.current-humidity');
  let currentWindEl = document.querySelector('.current-wind');
  currentCityEl.innerHTML = data.city;
  currentTemperatureEl.innerHTML = Math.round(data.temperature.current);
  currentHumidityEl.innerHTML = data.temperature.humidity;
  currentWindEl.innerHTML = data.wind.speed;
}

searchForm.addEventListener('submit', getInputValue);
