// Handles displaying of weather data
export default class WeatherUI {
  constructor(DOMElements, location) {
    this.DOMElements = DOMElements;
    this.location = location;
  }

  async displayWeatherData(weatherData, unitGroup) {
    this.DOMElements.city.textContent = this.location;
    this.DOMElements.condition.textContent = weatherData.conditions;
    this.DOMElements.icon.src = this.getWeatherIcon(weatherData.icon);
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

  getWeatherIcon(iconGroup) {
    const icons = {
      snow: 'https://openweathermap.org/img/wn/13d@4x.png',
      rain: 'https://openweathermap.org/img/wn/10d@4x.png',
      fog: 'https://openweathermap.org/img/wn/50d@4x.png',
      wind: 'https://openweathermap.org/img/wn/03d@4x.png',
      cloudy: 'https://openweathermap.org/img/wn/04n@4x.png',
      'partly-cloudy-day': 'https://openweathermap.org/img/wn/02d@4x.png',
      'partly-cloudy-night': 'https://openweathermap.org/img/wn/02n@4x.png',
      'clear-day': 'https://openweathermap.org/img/wn/01d@4x.png',
      'clear-night': 'https://openweathermap.org/img/wn/01n@4x.png',
    };

    return icons[iconGroup] ?? 'https://openweathermap.org/img/wn/02d@4x.png';
  }
}
