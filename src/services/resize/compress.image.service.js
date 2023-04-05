const sharp = require('sharp');


/**
 * Compresses the input image buffer using the provided quality.
 *
 * @async
 * @function compressImage
 * @param {Buffer} imageBuffer - The input image buffer to be compressed.
 * @param {number} [quality=70] - The quality of the compressed image (1-100), where lower values produce higher compression and lower quality.
 * @returns {Promise<Buffer>} A Promise that resolves to a Buffer containing the compressed image data in JPEG format.
 * @throws {Error} Throws an error if there is an issue with the image compression process.
 */
async function compressImage(imageBuffer, quality = 100) {
    return sharp(imageBuffer)
        .jpeg({ quality })
        .toBuffer();
}

module.exports = {
    compressImage,
};
