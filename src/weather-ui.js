// Handles displaying of weather data
export default class WeatherUI {
  constructor(DOMElements, location) {
    this.DOMElements = DOMElements;
    this.location = location;
  }

  async displayWeatherData(weatherData, unitGroup) {
    this.DOMElements.city.textContent = this.location;
    this.DOMElements.condition.textContent = weatherData.conditions;
    this.DOMElements.temp.textContent = weatherData.temp;
    this.DOMElements.tempMin.textContent = weatherData.tempmin;
    this.DOMElements.tempMax.textContent = weatherData.tempmax;
    this.DOMElements.feelsLike.textContent = weatherData.feelslike;
    this.DOMElements.humidity.textContent = weatherData.humidity;
    this.DOMElements.windSpeed.textContent =
      unitGroup === 'us'
        ? `${weatherData.windspeed} mph`
        : `${weatherData.windspeed} kph`;
    this.DOMElements.pressure.textContent = weatherData.pressure;

    this.DOMElements.weatherUnit.innerHTML =
      unitGroup === 'us' ? '&deg;F' : '&deg;C';
  }
}
