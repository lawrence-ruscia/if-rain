// Create class that represents weather data
class WeatherData {
  // properties:
  // location, datetime, conditions, humidity, windspeed, temp(may change based on chart)
  constructor(location, datetime, conditions, humidity, windspeed, temp) {
    this.location = location;
    this.datetime = datetime;
    this.conditions = conditions;
    this.humidity = humidity;
    this.windspeed = windspeed;
    this.temp = temp;
  }
}
