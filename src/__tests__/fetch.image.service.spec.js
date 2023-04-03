const axios = require('axios');
const { fetchImage } = require('../services/fetch/fetch.image.service');

jest.mock('axios'); // Mock axios module

describe('fetchImage', () => {
    const imageUrl = 'https://example.com/image.png';
    const imageBuffer = Buffer.from([0x01, 0x02, 0x03]);

    beforeEach(() => {
        axios.get.mockClear(); // Clear the mock before each test
    });

    it('should fetch the image data and return a Buffer', async () => {
        axios.get.mockResolvedValueOnce({
            data: imageBuffer,
        });

        const result = await fetchImage(imageUrl);

        expect(result).toEqual(imageBuffer);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(imageUrl, {
            responseType: 'arraybuffer',
        });
    });

    it('should throw an error if there is an issue with the image request', async () => {
        const errorMessage = 'Failed to fetch image';
        const error = new Error(errorMessage);

        axios.get.mockRejectedValueOnce(error);

        await expect(fetchImage(imageUrl)).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(imageUrl, {
            responseType: 'arraybuffer',
        });
    });
});
