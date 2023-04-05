const { fetchImage } = require('./fetch/fetch.image.service');
const { fetchWeatherData } = require('./fetch/fetch.weather.service');
const { envs } = require('../envs/api.envs');
const { statusCode } = require('../enums/status.code.enum');
const { weatherImages } = require('../enums/weather.pictures.enum');
const { compressImage } = require('./resize/compress.image.service');


/**
 * The main service that fetches the weather data, retrieves the corresponding weather image, resizes the image, and sends the result in the response.
 * @async
 * @function mainService
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} - If an error occurs while fetching the weather data, retrieving the weather image, resizing the image, or sending the response.
*/
async function mainService(req, res) {
    try {
        const weather = await fetchWeatherData(envs.CITY_NAME, envs.API_KEY);
        const imageUrl = weatherImages[weather];
        const imageBuffer = await fetchImage(imageUrl);


        res.type('image/png').send(imageBuffer).status(statusCode.OK);
    } catch (error) {
        console.error(error);
        res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    mainService,
};
