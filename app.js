const cities = ["San Francisco", "New York", "Barcelona", "Paris", "Rome", 
                "Prague", "London", "Edinburgh", "Dublin", "Valletta", "Dubai", 
                "Cluj", "Bucharest", "Kiev", "Tokyo", "Kyoto", "Seoul"];

let weather = {
    apiKey: "38f2628894f12506273281d6dfee83e5",
    fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, feels_like, pressure } = data.main;
      const { speed } = data.wind;
      const { sunrise, sunset } = data.sys;
      const { lon, lat } = data.coord;
      
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
      document.querySelector(".description").innerText = description;    
      document.querySelector(".temp").innerText = Math.trunc(temp);
      document.querySelector(".feel-value").innerText = Math.trunc(feels_like) + " ºC";
      document.querySelector(".humidity-value").innerText = humidity + " %";
      document.querySelector(".wind-value").innerText = speed + " k/h";
      document.querySelector(".pressure-value").innerText = pressure + " hPa";
      document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?' + name + '")';
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search(); // get the content of the searbar and search for it
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather(cities[Math.floor(Math.random() * cities.length)]);