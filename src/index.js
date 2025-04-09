import WeatherData from './weather-data';
// Create class for weather app for fetching data, displaying, etc.
class IfRain {
  // properties:
  // location from which the user wants to get weather data from
  constructor(location) {
    this.location = location;
    this.API_URL = process.env.API_URL;
    this.API_KEY = process.env.API_KEY;
  }

  async fetchWeatherData() {
    const response = await fetch(
      `${this.API_URL}${this.location}?key=${this.API_KEY}&unitGroup=metric&elements=datetime,conditions,humidity,windspeed,temp`
    );

    const data = await response.json();
    console.log(data);

    const weatherData = new WeatherData({
      location: data.address,
      datetime: data.currentConditions.datetime,
      conditions: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      temp: data.currentConditions.temp,
    });

    console.log(weatherData);

    return weatherData;
  }
}

const app = new IfRain('Mandaluyong');
const weatherData = app.fetchWeatherData();
