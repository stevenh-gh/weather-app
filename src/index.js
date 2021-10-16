import "./style.css";

class Weather {
    constructor(city, country, feelsLike, temp, humidity, pressure, windDeg, windSpeed, weatherDesc) {
        this.city = city;
        this.country = country;
        this.feelsLike = feelsLike;
        this.temp = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windDeg = windDeg;
        this.windSpeed = windSpeed;
        this.weatherDesc = weatherDesc;
    }
}

async function getWeather(city) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.APP_ID}`, { mode: "cors" });
    const data = await promise.json();
    return new Weather(
        data.name,
        data.sys.country,
        data.main.feels_like,
        data.main.temp,
        data.main.humidity,
        data.main.pressure,
        data.wind.deg,
        data.wind.speed,
        data.weather[0].description
    );
}

function display(weather) {
    const result = document.querySelector("#results");
    while (result.firstChild) { // reset results div
        result.removeChild(result.firstChild);
    }
    result.innerHTML = `
    <h1>${weather.city}, ${weather.country}</h1>
    <h2>Feels like:</h2>
    <p>${weather.feelsLike}</p>
    <h2>Temperature:</h2>
    <p>${weather.temp}</h2>
    <h2>Humidity:</h2>
    <p>${weather.humidity}</h2>
    <h2>Pressure:</h2>
    <p>${weather.pressure}</h2>
    <h2>Wind degree:</h2>
    <p>${weather.windDeg}</h2>
    <h2>Wind speed:</h2>
    <p>${weather.windSpeed}</h2>
    <h2>Weather description:</h2>
    <p>${weather.weatherDesc}</h2>
    `;
}

const submitBtn = document.querySelector("button");
const form = document.querySelector("form");
submitBtn.addEventListener("click", e => {
    const fd = new FormData(form);
    const city = fd.get("city");
    if (city) {
        e.preventDefault();
        console.log(city);
        getWeather(city).then(result => display(result)).catch(e => console.log(e));
    }
});