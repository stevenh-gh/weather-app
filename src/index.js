import "./style.css";

class Weather {
    constructor(city, country, feelsLike, temp, humidity, pressure, windDeg, windSpeed, weatherDesc, icon) {
        this.city = city;
        this.country = country;
        this.feelsLike = feelsLike;
        this.temp = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windDeg = windDeg;
        this.windSpeed = windSpeed;
        this.weatherDesc = weatherDesc;
        this.icon = icon;
    }
}

async function getWeather(city) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.APP_ID}&units=${unit.checked ? "imperial" : "metric"}`, { mode: "cors" });
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
        data.weather[0].description,
        data.weather[0].icon
    );
}

function display(weather) {
    const result = document.querySelector("#results");
    while (result.firstChild) { // reset results div
        result.removeChild(result.firstChild);
    }
    const tempUnit = unit.checked ? "&deg;F" : "&deg;C";
    const speedUnit = unit.checked ? "miles/hr" : "m/s";
    result.innerHTML = `
    <div class="grid grid-cols-3 grid-rows-5 items-center">
        <div class="col-span-3 flex justify-center gap-3">
            <img src=https://www.countryflags.io/${weather.country}/shiny/64.png>
            <h1 class="text-5xl self-center">${weather.city}, ${weather.country}</h1>
        </div>
        <p class="text-4xl col-span-3">${weather.temp}<sup>${tempUnit}</sup></p>
        <div class="col-span-3 flex justify-center">
            <p class="self-center">${weather.weatherDesc}</p>
            <img class="" src=http://openweathermap.org/img/wn/${weather.icon}@2x.png alt="">
        </div>
        <div>
            <h2>Feels like</h2>
            <p class="text-2xl">${weather.feelsLike}<sup>${tempUnit}</sup></p>
        </div>
        <div>
            <h2>Humidity</h2>
            <p class="text-2xl">${weather.humidity}%</p>
        </div>
        <div>
            <h2>Pressure</h2>
            <p class="text-2xl">${weather.pressure}<sup>hPa</sup></p>
        </div>
        <div class="col-span-3 flex justify-center gap-56">
            <div>
                <h2>Wind degree</h2>
                <p class="text-2xl">${weather.windDeg}</p>
            </div>
            <div>
                <h2>Wind speed</h2>
                <p class="text-2xl">${weather.windSpeed}<sup>${speedUnit}</sup></p>
            </div>
        </div>
    </div>
    `;
}

function processForm(e) {
    const fd = new FormData(form);
    const city = fd.get("city");
    if (city) {
        if (e.target.localName == "button") {
            e.preventDefault();
        }
        getWeather(city).then(result => display(result)).catch(e => console.log(e));
    }
}

const form = document.querySelector("form");

const unit = document.querySelector("input[type='checkbox']");
unit.addEventListener("click", e => processForm(e));

const submitBtn = document.querySelector("button");
submitBtn.addEventListener("click", e => processForm(e));