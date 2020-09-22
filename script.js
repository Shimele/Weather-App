//selecting elements
const searchButton = document.querySelector(".button");
const cityInput = document.querySelector(".cityInput");
const notifElement = document.querySelector(".notif");
const iconElement = document.querySelector(".temp-icon");
const tempElement = document.querySelector(".temp-val p");
const descriptElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".temp-location p");

let openWeatherData = {};
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "http://api.openweathermap.org/data/2.5/weather?q=yaounde&appid=3bfbd0271d33f048e213c7535c45165f"
);
h;
xhr.responseType = "text";

xhr.addEventListener(
  "load",
  function () {
    alert("hello");
    notifElement.innerHTML = "yes";
    if (xhr.status === 200) {
      notifElement.textContent = "success";
    } else {
      notifElement.textContent = "error :" + xhr.status;
    }
  },
  false
);

xhr.send();
