const apiKey = "69f7fc7e2aa650828ec0bcb8b7b57b05",
  apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchInput = document.querySelector(".search-input"),
  searchBtn = document.querySelector(".search-btn"),
  error = document.querySelector(".error"),
  weather = document.querySelector(".weather");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (response.status === 404) {
      error.style.display = "block";
      weather.style.display = "none";
    } else {
      let data = await response.json();

      displayWeather(data);
      error.style.display = "none";
    }
  } catch (error) {
    showError("Error fetching weather data:");
  }
}

async function displayWeather(data) {
  let city = document.querySelector(".city"),
    temp = document.querySelector(".temp"),
    humidity = document.querySelector(".humidity"),
    wind = document.querySelector(".wind"),
    weatherImg = document.querySelector(".weather-img");

  city.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp);
  humidity.innerHTML = data.main.humidity;
  wind.innerHTML = data.wind.speed;

  const weatherMain = data.weather[0].main.toLowerCase();
  switch (weatherMain) {
    case "clear":
      weatherImg.src = "imgs/clear.png";
      break;
    case "clouds":
      weatherImg.src = "imgs/clouds.png";
      break;
    case "rain":
      weatherImg.src = "imgs/rain.png";
      break;
    case "drizzle":
      weatherImg.src = "imgs/drizzle.png";
      break;
    case "mist":
      weatherImg.src = "imgs/mist.png";
      break;
    default:
      weatherImg.src = "imgs/default.png";
  }
  weather.style.display = "block";
}

searchBtn.addEventListener("click", function () {
  checkWeather(searchInput.value.trim());
});

function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}
