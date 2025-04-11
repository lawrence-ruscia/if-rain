import 'normalize.css';
import './style.css';
import WeatherData from './weather-data';
import WeatherUI from './weather-ui';

// Create class for weather app for fetching data, displaying, etc.
class IfRain {
  // properties:
  // location from which the user wants to get weather data from
  constructor(DOMElements, location = 'london', unit = 'us') {
    this.location = location;
    this.unit = unit;
    this.API_URL = process.env.API_URL;
    this.API_KEY2 = process.env.API_KEY;
    this.DOMElements = DOMElements;
    this.weatherUI = new WeatherUI(DOMElements, this.location);
  }

  async init() {
    const weatherDataToday = await this.getWeatherForDay(0, this.unit);

    this.weatherUI.displayWeatherData(weatherDataToday, this.unit);
    this.handleUnitChange(weatherDataToday);
  }

  async handleUnitChange() {
    this.DOMElements.weatherUnit.addEventListener('click', async (e) => {
      const { target } = e;

      const { unit } = target.dataset;
      const unitGroup = unit === 'farenheit' ? 'us' : 'metric';

      console.log('fetching weather data...');
      const weatherData = await this.getWeatherForDay(0, unitGroup);
      this.weatherUI.displayWeatherData(weatherData, unitGroup);
      console.log('data displayed!');

      const { text, newUnit } = this.toggleUnitBtnText(target);
      target.innerHTML = text;
      target.dataset.unit = newUnit;
    });
  }

  toggleUnitBtnText(target) {
    const { unit } = target.dataset;
    let text;
    let newUnit;

    if (unit === 'celcius') {
      text = '&deg;C';
      newUnit = 'farenheit';
    }
    if (unit === 'farenheit') {
      text = '&deg;F';
      newUnit = 'celcius';
    }

    return { text, newUnit };
  }

  async fetchWeatherData(unit = this.unit) {
    const response = await fetch(this.#buildRequest(unit));
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

  #buildRequest(unit) {
    return `${this.API_URL}/${this.location}/next7days?key=RDC9J9RJ4NWW9RQ2KYD8V2X84&unitGroup=${unit}`;
  }

  async getWeatherForDay(dayIndex, unit = this.unit) {
    const data = await this.fetchWeatherData(unit);

    const weatherData = new WeatherData({ ...data.days[dayIndex] }); // fetch weather for a specific day
    console.log(weatherData);

    return weatherData;
  }
}

const city = document.querySelector('.weather__city');
const datetime = document.querySelector('.weather__datetime > p');
const condition = document.querySelector('.weather__condition > p');
const icon = document.querySelector('.weather__icon > img');
const temp = document.querySelector('.weather__temp-value .value');
const tempMin = document.querySelector('.weather__temp--min > .value');
const tempMax = document.querySelector('.weather__temp--max > .value');
const feelsLike = document.querySelector('.weather__feels-like > .value');
const humidity = document.querySelector('.weather__humidity > .value');
const windSpeed = document.querySelector('.weather__wind > .value');
const pressure = document.querySelector('.weather__pressure > .value');
const weatherUnit = document.querySelector('.weather__unit');
const DOMElements = {
  city,
  datetime,
  condition,
  icon,
  temp,
  tempMin,
  tempMax,
  feelsLike,
  humidity,
  windSpeed,
  pressure,
  weatherUnit,
};

const app = new IfRain(DOMElements, 'Greenland', 'us');
// app.init();
