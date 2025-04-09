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
    // TODO: Create separate function for configuring API call
    const response = await fetch(
      `${this.API_URL}${this.location}/next7days?key=${this.API_KEY}&unitGroup=${this.unit}&elements=datetime,conditions,humidity,windspeed,temp`
    );

    const data = await response.json();

    const weatherData = new WeatherData({
      datetime: data.currentConditions.datetime,
      conditions: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      temp: data.currentConditions.temp,
      days: data.days,
    });

    return weatherData;
  }

  async getWeatherForDay(dayIndex) {
    const data = await this.fetchWeatherData();
    const weatherData = new WeatherData({ ...data.days[dayIndex] }); // fetch weather for a specific day

    return weatherData;
  }

  async getTomorrow() {
    const weatherData = await this.getWeatherForDay(1);
    console.log(weatherData);
    return weatherData;
  }
}

const app = new IfRain('Mandaluyong', 'metric');
app.getTomorrow();
