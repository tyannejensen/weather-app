import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (_req: Request, _res: Response) => {
  // TODO: GET weather data from city name
  console.log('POST /');
  const { cityName } = _req.body;
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  _res.json(weatherData);

});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {
  return _res.json(await HistoryService.getCities());
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  await HistoryService.removeCity(id);
  return _res.json(await HistoryService.getCities());
});

export default router;
