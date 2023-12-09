const axios = require('axios');

/**
 * Fetches an image from a given URL.
 *
 * @async
 * @function fetchImage
 * @param {string} imageUrl - The URL of the image to be fetched.
 * @returns {Promise<Buffer>} A Promise that resolves to a Buffer containing the image data.
 * @throws {Error} Throws an error if there is any issue with the image request.
 */
async function fetchImage(imageUrl) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden error fetching image:', error);
            throw new Error('The server denied access to the image. Please check your credentials or permissions.');
        }
        console.error('Error fetching image:', error);
        throw error;
    }
}

module.exports = {
    fetchImage,
};
