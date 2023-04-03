const axios = require('axios');


/**
 * Fetches the weather data for a given city using the OpenWeatherMap API.
 * @async
 * @function fetchWeatherData
 * @param {string} cityName - The name of the city to fetch the weather for.
 * @param {string} apiKey - The API key to use for authentication with the OpenWeatherMap API.
 * @returns {Promise<string>} - A promise that resolves to a string representing the main weather condition for the given city.
 * @throws {Error} - If an error occurs while fetching the weather data.
*/
async function fetchWeatherData(cityName, apiKey) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const response = await axios.get(url);

        const weather = response.data.weather[0].main;
        return weather
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

module.exports = {
    fetchWeatherData,
};

