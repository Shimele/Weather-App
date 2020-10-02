//selecting elements

const searchButton = document.querySelector(".button");
const temperature = document.querySelector(".temperature p");
const notifElement = document.querySelector(".notif");
const iconElement = document.querySelector(".icon");
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
      console.log(data)
      openWeatherData.location = `${data.name}, ${data.sys.country}`;
      openWeatherData.description = data.weather[0].description;
      openWeatherData.temperature = Math.round(data.main.temp);
      const wind = Math.round(data.wind.speed);
      let timezone = data.timezone;
      let timeStamp = new Date(data.dt * 1000);
      const time = new Date(data.dt * 1000).toLocaleTimeString(); //convert timestamp to local time display in miliseconds
      const iconID = data.weather[0].description;
      let hours = timeStamp.getHours();
      const icon = new Skycons({"color": "#222"})

      console.log(hours);
      if (hours < 16)
      {
        document.body.style.backgroundImage = "url('./icons/bg.jpg')";
      }else if (hours > 16 && hours < 19) {
        document.body.style.backgroundImage = "url('./icons/bg2.jpg')";
      }else if (hours > 19 || hours < 5) {
        document.body.style.backgroundImage = "url('./icons/bg3.jpg')";
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
      icon.set('icon', data.weather[0].description)
      icon.play()
      notifElement.textContent = `Hi, it's ${time}`;
      locationElement.textContent = openWeatherData.location;
      temperature.textContent = `${openWeatherData.temperature}°`;
      descriptElement.textContent = openWeatherData.description;
      windElement.textContent = "Wind Speed: " + wind + "mph";
    });
    
});
