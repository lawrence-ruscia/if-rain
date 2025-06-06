// Create class that represents weather data
export default class WeatherData {
  constructor({
    address,
    timezone,
    datetime,
    conditions,
    icon,
    temp,
    tempmin,
    tempmax,
    feelslike,
    humidity,
    windspeed,
    pressure,
  }) {
    this.address = address;
    this.timezone = timezone;
    this.datetime = datetime;
    this.conditions = conditions;
    this.icon = icon;
    this.temp = temp;
    this.tempmin = tempmin;
    this.tempmax = tempmax;
    this.feelslike = feelslike;
    this.humidity = humidity;
    this.windspeed = windspeed;
    this.pressure = pressure;
  }
}
