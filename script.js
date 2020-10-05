//selecting elements
const searchButton = document.querySelector(".button");
const temperature = document.querySelector(".temperature p");
let greetings = document.querySelector(".notif span");
const notifElement = document.querySelector(".notif p");
const iconElement = document.querySelector(".icon");
const windElement = document.querySelector(".wind-val p");
const humidityElement = document.querySelector(".humidity-val p");
const descriptElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".temp-location p");

//errorDisplay.style.display = "none";
let openWeatherData = {};
//greetings;
const countryData = {
  US: "Hello!",
  GB: "Hi!",
  FR: "Salut!",
  CN: "Nǐ hǎo!",
  ES: "Hola!",
  IT: "Ciao!",
  DE: "Hallo!",
  RU: "Zdravstvuyte!",
  IN: "Namaste!",
  PT: "Olá!",
};
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
      if (response.status == 404) {
        locationElement.style.color = "red";
        locationElement.textContent = "Please enter a vaid city name";
      }
      let data = response.json();
      return data;
    })
    .then(function (data) {
      openWeatherData.location = `${data.name}, ${data.sys.country}`;
      openWeatherData.countryName = data.sys.country;
      openWeatherData.description = data.weather[0].description;
      openWeatherData.temperature = Math.round(data.main.temp);
      const wind = Math.round(data.wind.speed);
      const humidity = data.main.humidity;
      const time = new Date(data.dt * 1000).toLocaleTimeString(); //convert timestamp to local time display in miliseconds

      //change greetings according to country

      for (let country in countryData) {
        if (country == openWeatherData.countryName) {
          greetings.textContent = countryData[country];
        }
      }

      //change background according to day/night and description
      if (
        data.weather[0].icon.indexOf("d") > -1 &&
        data.weather[0].description.indexOf("rain" || "drizzle") > -1
      ) {
        document.body.style.backgroundImage = "url('./icons/bg-drain.jpg')";
      } else if (
        data.weather[0].icon.indexOf("d") > -1 &&
        data.weather[0].description.indexOf("snow") > -1
      ) {
        document.body.style.backgroundImage = "url('./icons/bg-dsnow.jpg')";
      } else if (
        data.weather[0].icon.indexOf("n") > -1 &&
        data.weather[0].description.indexOf("rain" || "drizzle") > -1
      ) {
        document.body.style.backgroundImage = "url('./icons/bg-nrain.jpg')";
      } else if (
        data.weather[0].icon.indexOf("n") > -1 &&
        data.weather[0].description.indexOf("snow") > -1
      ) {
        document.body.style.backgroundImage = "url('./icons/bg-nsnow.jpg')";
      } else if (data.weather[0].icon.indexOf("n") > -1) {
        document.body.style.backgroundImage = "url('./icons/bg3.jpg')";
      } else {
        document.body.style.backgroundImage = "url('./icons/bg.jpg')";
      }
      //let minutes = time.getMinutes();

      //Format date and time display
      //let timeDisplay = "";

      //if (minutes < 10) {
      //insert 0 infront of single digit e.g 05 instead of 5
      //minutes = `0${minutes}`;
      //}
      //convert from military time (to english reading)
      //if (hours == 12) {
      //timeDisplay = `12:${minutes} PM`;
      //} else if (hours > 12) {
      //timeDisplay = `${hours - 12}:${minutes} PM`;
      //} else if (hours == 0) {
      //timeDisplay = `12:${minutes} AM`;
      //} else {
      //timeDisplay = `${hours}:${minutes} AM`;
      //}

      //Populate Weather
      notifElement.textContent = ` ${time}`;
      locationElement.textContent = openWeatherData.location;
      locationElement.style.color = "#91a307";
      temperature.textContent = `${openWeatherData.temperature}°`;
      iconElement.src =
        " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      descriptElement.textContent = openWeatherData.description;
      windElement.textContent = "Wind Speed at : " + wind + "mph";
      humidityElement.textContent = "Humidity level: " + humidity + "%";
    });
});
