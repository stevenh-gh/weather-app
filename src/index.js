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
getWeather();