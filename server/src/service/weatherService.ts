import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;
  cityDetails: any = null;  

  constructor() {
    this.baseURL = `${process.env.API_BASE_URL}`;
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  
  // TODO: Create fetchLocationData method
  public async fetchLocationData() {
    const response = await fetch(this.buildGeocodeQuery());
    const data = await response.json();
    return data;
  }
  
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any) {
    console.log(locationData);
    this.cityDetails = locationData;
    const { lat, lon } = locationData.coord;
    return { lat, lon };
  } 

  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureWeatherData(weatherData: any, forecastData: any) {
    const currentWeather = this.parseCurrentWeather(weatherData);
    // const forecastWeather = this.buildForecastArray(currentWeather, weatherData.weather);
    return [currentWeather, this.parseForecastWeather(this.grabDailyForecast(forecastData.list))];
  }

  private grabDailyForecast(forecastData: any): any {
    // sort through the forecast data and grab the daily forecast
    let dailyForecast: any = [];
    console.log(forecastData);
    forecastData.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000);
      console.log(date);
      if (new Date(forecast.dt * 1000).toString().includes('12:00:00')) {
        dailyForecast.push(forecast);
      }
    });
    return dailyForecast;
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery() {
    return `${this.baseURL}data/2.5/weather?q=${this.cityName}&limit=1&units=imperial&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates) {
    const { lat, lon } = coordinates;
    return `${this.baseURL}data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
  }

  private buildForecastQuery(coordinates: Coordinates) {
    const { lat, lon } = coordinates;
    return `${this.baseURL}data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}å
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    console.log(query);
    const locationData = await this.fetchLocationData();
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    console.log(query);
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return data;
  }

  private async fetchForecastData(coordinates: Coordinates) {
    const query = this.buildForecastQuery(coordinates);
    console.log(query);
    const response = await fetch(this.buildForecastQuery(coordinates));
    const data = await response.json();
    return data;
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {
    const city = response.name;
    const date = new Date(response.dt * 1000).toDateString();
    const icon = response.weather ? response.weather[0].icon : null;
    const iconDescription = response.weather ? response.weather[0].description : null;
    const tempF = response.main.temp;
    const windSpeed = response.wind ? response.wind.speed: null;
    const humidity = response.main ? response.main.humidity : null;
    return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
  }

  private parseForecastWeather(forecasts: any) {
    console.log(forecasts);
    return forecasts.map((forecast: any) => {
      //set date to a human readable format
      
      const date = new Date(forecast.dt * 1000).toDateString();
      const icon = forecast.weather ? forecast.weather[0].icon : null;
      const iconDescription = forecast.weather ? forecast.weather[0].description : null;
      const tempF = forecast.main.temp;
      const windSpeed = forecast.wind ? forecast.wind.speed: null;
      const humidity = forecast.main ? forecast.main.humidity : null;
      return new Weather(this.cityName, date, icon, iconDescription, tempF, windSpeed, humidity);
    });
  }

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  public async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const forecastData = await this.fetchForecastData(coordinates);
    return this.destructureWeatherData(weatherData, forecastData);
  }
}

export default new WeatherService();