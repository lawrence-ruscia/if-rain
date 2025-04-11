import WeatherData from './weather-data';
// Create class for weather app for fetching data, displaying, etc.
class IfRain {
  // properties:
  // location from which the user wants to get weather data from
  constructor(location = 'london', unit = 'us') {
    this.location = location;
    this.unit = unit;
    this.API_URL = process.env.API_URL;
    this.API_KEY = process.env.API_KEY;
  }

  async fetchWeatherData() {
    const response = await fetch(this.#buildRequest());
    const data = await response.json();

    console.log(data);

    const weatherData = {
      address: data.address,
      currentConditions: data.currentConditions,
      days: data.days,
    };

    console.log(weatherData);

    return weatherData;
  }

  #buildRequest() {
    return `${this.API_URL}/${this.location}/next7days?key=${this.API_KEY}&unitGroup=${this.unit}`;
  }

  async getWeatherForDay(dayIndex) {
    const data = await this.fetchWeatherData();
    const weatherData = new WeatherData({ ...data.days[dayIndex] }); // fetch weather for a specific day
    console.log(weatherData);

    return weatherData;
  }

  async getWeatherForToday() {
    const weatherData = await this.getWeatherForDay(0);

    return weatherData;
  }
}

const app = new IfRain('Mandaluyong', 'metric');
app.getWeatherForToday();
