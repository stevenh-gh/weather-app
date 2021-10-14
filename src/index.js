import "./style.css";

async function getWeather() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.APP_ID}`, { mode: "cors" });
    const data = await promise.json();
    console.log(data);
}
getWeather();