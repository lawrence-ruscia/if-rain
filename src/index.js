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
    this.handleCitySearch(weatherDataToday);
  }

  async handleUnitChange() {
    this.DOMElements.weatherUnit.addEventListener('click', async (e) => {
      const { target } = e;

      const { unit } = target.dataset;

      // Update unit
      this.unit = unit === 'farenheit' ? 'us' : 'metric';

      console.log('fetching weather data...');
      const weatherData = await this.getWeatherForDay(0, this.unit);
      this.weatherUI.displayWeatherData(weatherData, this.unit);
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

    // TODO: Move this to another function
    const time = data.currentConditions.datetime;
    const date = data.days[0].datetime;
    const convertedDateTime = new Date(`${date}T${time}`);

    const weatherData = {
      datetime: convertedDateTime,
      address: data.address,
      currentConditions: data.currentConditions,
      days: data.days,
    };

    return weatherData;
  }

  #buildRequest(unit) {
    return `${this.API_URL}/${this.location}/next7days?key=RDC9J9RJ4NWW9RQ2KYD8V2X84&unitGroup=${unit}`;
  }

  async getWeatherForDay(dayIndex, unit = this.unit) {
    const data = await this.fetchWeatherData(unit);

    // NOTE: The order here matters, since the latter object overrides the datetime of the previous
    const weatherData = new WeatherData({ ...data.days[dayIndex], ...data }); // fetch weather for a specific day
    console.log(weatherData);

    return weatherData;
  }

  async handleCitySearch() {
    this.DOMElements.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const location = this.DOMElements.cityInput;
      const locationValue = location.value;

      // update location
      this.location = locationValue;

      const weatherData = await this.getWeatherForDay(0);
      this.weatherUI.displayWeatherData(weatherData, this.unit);
      location.value = ''; // clear input after
    });
  }
}

const form = document.querySelector('#weather__form');
const cityInput = document.querySelector('#city');
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
  form,
  cityInput,
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
app.init();
