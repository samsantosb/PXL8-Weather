const { mainService } = require('../services/main.service');
const { fetchImage } = require('../services/fetch/fetch.image.service');
const { fetchWeatherData } = require('../services/fetch/fetch.weather.service');
const { envs } = require('../envs/api.envs');
const { statusCode } = require('../enums/status.code.enum');
const { weatherImages } = require('../enums/weather.pictures.enum');

jest.mock('../services/fetch/fetch.image.service');
jest.mock('../services/fetch/fetch.weather.service');

describe('mainService', () => {
    it('should return a resized image buffer with 200 status code when successful', async () => {
        const weather = 'cloudy';
        const imageUrl = 'https://example.com/image.png';
        const imageBuffer = Buffer.from([0x01, 0x02, 0x03]);

        fetchWeatherData.mockResolvedValueOnce(weather);
        fetchImage.mockResolvedValueOnce(imageBuffer);


        const req = null;
        const res = {
            type: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };

        await mainService(req, res);

        expect(fetchWeatherData).toHaveBeenCalledWith(envs.CITY_NAME, envs.API_KEY);
        expect(fetchImage).toHaveBeenCalledWith(weatherImages[weather]);
        expect(res.type).toHaveBeenCalledWith('image/png');
        expect(res.send).toHaveBeenCalledWith(imageBuffer);
        expect(res.status).toHaveBeenCalledWith(statusCode.OK);
    });

    it('should return 500 status code when an error occurs', async () => {
        const errorMessage = 'Failed to fetch weather data';
        const error = new Error(errorMessage);

        fetchWeatherData.mockRejectedValueOnce(error);

        const req = null;
        const res = {
            sendStatus: jest.fn().mockReturnThis(),
        };

        await mainService(req, res);

        expect(fetchWeatherData).toHaveBeenCalledWith(envs.CITY_NAME, envs.API_KEY);
        expect(res.sendStatus).toHaveBeenCalledWith(statusCode.INTERNAL_SERVER_ERROR);
    });
});
