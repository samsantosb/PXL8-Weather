const axios = require('axios');
const { fetchWeatherData } = require('../services/fetch/fetch.weather.service');

jest.mock('axios'); // Mock axios module

describe('fetchWeatherData', () => {
    const cityName = 'London';
    const apiKey = '1234567890';
    const weather = 'Clouds';

    beforeEach(() => {
        axios.get.mockClear(); // Clear the mock before each test
    });

    it('should fetch the weather data and return the main weather condition', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                weather: [{ main: weather }],
            },
        });

        const result = await fetchWeatherData(cityName, apiKey);

        expect(result).toEqual(weather);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    });

    it('should throw an error if there is an issue with the weather data request', async () => {
        const errorMessage = 'Failed to fetch weather data';
        const error = new Error(errorMessage);

        axios.get.mockRejectedValueOnce(error);

        await expect(fetchWeatherData(cityName, apiKey)).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    });
});
