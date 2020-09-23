//selecting elements
const searchButton = document.querySelector(".button");

const notifElement = document.querySelector(".notif");
const iconElement = document.querySelector(".temp-icon img");
const windElement = document.querySelector(".wind-val p");
const descriptElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".temp-location p");

let openWeatherData = {};
//let xhr = new XMLHttpRequest();
//xhr.open(
//"GET",
//"http://api.openweathermap.org/data/2.5/weather?q={cityInput}&appid=3bfbd0271d33f048e213c7535c45165f&units=metric"
//);
//xhr.responseType = "text";

//(xhr.onload = () => {
//searchButton.addEventListener('submit', )
//if (xhr.status === 200) {
//notifElement.textContent = "Loading...";
//openWeatherData = JSON.parse(xhr.responseText);
//weatherInfo();
//} else {
//notifElement.textContent = "error :" + xhr.status;
//}
//}),
//xhr.send();

searchButton.addEventListener("click", function weatherInfo() {
  const cityInput = document.querySelector(".cityInput").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=3bfbd0271d33f048e213c7535c45165f&units=metric`
  )
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      openWeatherData.location = data.name;
      openWeatherData.description = data.weather[0].description;
      openWeatherData.temperature = Math.round(data.main.temp);
      const wind = Math.round(data.wind.speed);
      const time = new Date(data.dt * 1000 - data.timezone * 1000); //to display in miliseconds
      console.log(time);
      let hours = time.getHours();
      let minutes = time.getMinutes();

      //Format date and time display
      let timeDisplay = "";

      if (minutes < 10) {
        //insert 0 infront of single digit e.g 05 instead of 5
        minuts = `0${minutes}`;
      }
      //convert from military time (to english reading)
      if (hours == 12) {
        timeDisplay = `12:${minutes} PM`;
      } else if (hours > 12) {
        timeDisplay = `${hours - 12}:${minutes} PM`;
      } else if (hours == 0) {
        timeDisplay = `12:${minutes} AM`;
      } else {
        timeDisplay = `${hours}:${minutes} AM`;
      }

      //Populate Weather
      const cityAndTemp = `${openWeatherData.location} ${openWeatherData.temperature}°C`;
      notifElement.textContent = `Hi, it is ${timeDisplay}`;
      locationElement.textContent = cityAndTemp;
      descriptElement.textContent = openWeatherData.description;
      windElement.textContent = "WindSpeed:" + wind + "mph";

      if (descriptElement.textContent == "thunderstorm with rain") {
        iconElement.src = "./icons/thunderstorm.png";
      } else if (descriptElement.textContent == "overcast clouds") {
        iconElement.src = "./icons/overcast.png";
      } else if (descriptElement.textContent == "broken clouds") {
        iconElement.src = "./icons/broken.png";
      } else if (descriptElement.textContent == "moderate rain") {
        iconElement.src = "./icons/moderate.png";
      } else if (descriptElement.textContent == "clear sky") {
        iconElement.src = "./icons/clearSkies.png";
      } else if (descriptElement.textContent == "light rain") {
        iconElement.src = "./icons/light-rain.png";
      } else if (descriptElement.textContent == "heavy intensity rain") {
        iconElement.src = "./icons/heavy.png";
      } else if (descriptElement.textContent == "few clouds") {
        iconElement.src = "./icons/few-clouds.png";
      } else if (descriptElement.textContent == "scattered clouds") {
        iconElement.src = "./icons/scattered.png";
      }
    });
});
