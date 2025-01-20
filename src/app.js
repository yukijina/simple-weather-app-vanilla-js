let apiKey = '2f5896dd4cc0cdo340203tba4fba205f';

let searchForm = document.querySelector('.form-container');

function displayResult(response) {
  console.log(response.data);
  let data = response.data;
  let currentCity = document.querySelector('.current-city');
  let currentTemperature = document.querySelector('.current-temperature');
  let currentHumidity = document.querySelector('.current-humidity');
  let currentWind = document.querySelector('.current-wind');
  currentCity.innerHTML = data.city;
  currentTemperature.innerHTML = Math.round(data.temperature.current);
  currentHumidity.innerHTML = data.temperature.humidity;
  currentWind.innerHTML = data.wind.speed;
}

function getInputValue(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayResult);
}

searchForm.addEventListener('submit', getInputValue);
