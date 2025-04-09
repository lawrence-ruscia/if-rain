// Create class that represents weather data
export default class WeatherData {
  // properties:
  //  datetime, conditions, humidity, windspeed, temp, days(daily data)
  constructor({ datetime, conditions, humidity, windspeed, temp, days = [] }) {
    this.datetime = datetime;
    this.conditions = conditions;
    this.humidity = humidity;
    this.windspeed = windspeed;
    this.temp = temp;
    this.days = days;
  }
}
