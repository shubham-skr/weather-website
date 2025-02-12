/* Icons Object with key as OpenWeather icon ID and value as an array of
   corresponding fontawesome icon and color */
const iconObj = {
  '01d': ['<i class="fas fa-sun"></i>', '#ffd700'],
  '01n': ['<i class="fas fa-sun"></i>', '#ffd700'],
  '02d': ['<i class="fas fa-cloud-sun"></i>', '#ffd700'],
  '02n': ['<i class="fas fa-cloud-sun"></i>', '#ffd700'],
  '03d': ['<i class="fas fa-cloud"></i>', '#c0c0c0'],
  '03n': ['<i class="fas fa-cloud"></i>', '#c0c0c0'],
  '04d': ['<i class="fas fa-cloud"></i>', '#c0c0c0'],
  '04n': ['<i class="fas fa-cloud"></i>', '#c0c0c0'],
  '09d': ['<i class="fas fa-cloud-showers-heavy"></i>', '#00bfff'],
  '09n': ['<i class="fas fa-cloud-showers-heavy"></i>', '#00bfff'],
  '10d': ['<i class="fas fa-cloud-sun-rain"></i>', '#00bfff'],
  '10n': ['<i class="fas fa-cloud-sun-rain"></i>', '#00bfff'],
  '11d': ['<i class="fas fa-bolt"></i>', '#ffd700'],
  '11n': ['<i class="fas fa-bolt"></i>', '#ffd700'],
  '13d': ['<i class="fas fa-snowflake"></i>', '#000'],
  '13n': ['<i class="fas fa-snowflake"></i>', '#000'],
  '50d': ['<i class="fas fa-smog"></i>', '#c0c0c0'],
  '50n': ['<i class="fas fa-smog"></i>', '#c0c0c0'],
};

// Array of months name
const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// All required elements to display weather data
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.weather-temp');
const condition = document.querySelector('.weather-condition');
const weatherLocation = document.querySelector('.weather-location');
const time = document.querySelector('.weather-time');
const minTemp = document.querySelector('.min-temp span');
const maxTemp = document.querySelector('.max-temp span');
const windSpeed = document.querySelector('.wind-speed span');
const humidity = document.querySelector('.humidity span');

// Display today's date in MM DD, YYYY format
const date = new Date();
time.innerHTML =
  monthName[date.getMonth()] +
  '&nbsp;' +
  date.getDate() +
  ',&nbsp;' +
  date.getFullYear();

// On submitting the Location
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get given location
  const location = search.value;

  // When the weather is loading
  temp.innerHTML = '<i class="fas fa-wind"></i>';
  condition.textContent = 'Loading...';
  weatherLocation.textContent = 'Just a second';

  // Fetching the weather data and displaying weather or error message
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        weatherIcon.innerHTML = '<img src="/img/sleep.png">';
        condition.textContent = data.error;
        temp.innerHTML = '<i class="fas fa-wind"></i>';
        weatherLocation.textContent = 'Try Again';
      } else {
        weatherIcon.innerHTML = iconObj[data.icon][0];
        weatherIcon.style.color = iconObj[data.icon][1];
        temp.textContent = data.temperature + '°C';
        condition.textContent = data.weather;
        if (!data.location || !data.country) {
          weatherLocation.textContent = location;
        } else {
          weatherLocation.textContent = data.location + ', ' + data.country;
        }
        minTemp.textContent = data.tempMin;
        maxTemp.textContent = data.tempMax;
        windSpeed.textContent = data.windSpeed;
        humidity.textContent = data.humidity;
      }
    });
  });
});
