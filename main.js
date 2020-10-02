// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

const city = document.querySelector(".location-city");
const country = document.querySelector(".location-country");
const icon = document.querySelector(".icon");
const deg = document.querySelector(".temp-degree");
const status = document.querySelector(".temp-description");
const key = "4392553aacd9afcfc6eb473e98929f35";

const weather = {};

weather.temperature = {
  unit: "celsius",
}

const KELVIN = 273;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    console.log("You are good to go!");
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("You denied, or your browser doesn't support!");
  }
});

function success(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  

  getWeather(lat, long);

  function getWeather(latitude, longitude) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    
    console.log(api);
    
    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function () {
        displayWeather();
      });
  }
}

function error() {
  console.log("error");
}

function displayWeather() {
  city.innerHTML = weather.city;
  country.innerHTML = weather.country;
  status.innerHTML = weather.description;
}
