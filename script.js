//selecting elements
const searchButton = document.querySelector(".button");
const cityInput = document.querySelector(".cityInput");
const notifElement = document.querySelector(".notif");
const iconElement = document.querySelector(".temp-icon");
const windElement = document.querySelector(".wind-val p");
const descriptElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".temp-location p");

let openWeatherData = {};
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "http://api.openweathermap.org/data/2.5/weather?q=yaounde&appid=3bfbd0271d33f048e213c7535c45165f&units=metric"
);
xhr.responseType = "text";

(xhr.onload = () => {
  if (xhr.status === 200) {
    notifElement.textContent = "Loading...";
    openWeatherData = JSON.parse(xhr.responseText);
    weatherInfo();
  } else {
    notifElement.textContent = "error :" + xhr.status;
  }
}),
  xhr.send();

function weatherInfo() {
  const location = openWeatherData.name;
  const description = openWeatherData.weather[0].description;
  const temperature = openWeatherData.main.temp;
  const wind = Math.round(openWeatherData.wind.speed);

  const cityAndTemp = `${location} ${temperature}°C`;

  locationElement.textContent = cityAndTemp;
  descriptElement.textContent = description;
  windElement.textContent = "WindSpeed:" + wind + "mph";
}
