import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// TODO: Define a City class with name and id properties

class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file in the db folder 
  // private async read() {}
  private async read() {
    const data = await fs.promises.readFile(__dirname + '/../../db/searchHistory.json', 'utf-8');
    return JSON.parse(data);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    await fs.promises.writeFile(__dirname + '/../../db/searchHistory.json', JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  public async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  public async addCity(city: string) {
    const cities = await this.read();``
    cities.push({ name: city, id: cities.length + 1 });
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  public async removeCity(id: string) {
    const cities = await this.read();
    const updatedCities = cities.filter((city: City) => city.id !== parseInt(id));
    await this.write(updatedCities);
  }
}

export default new HistoryService();