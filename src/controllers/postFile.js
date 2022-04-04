const { pipeline } = require('stream/promises');
const { createGzip } = require('zlib');
const fs = require('fs');
const crypto = require('crypto');
const { promisify } = require('util');
const scryptPromisified = promisify(crypto.scrypt);

const { createResponse } = require('../utils/createResponse');
const { appConfiguration } = require('../../appConfiguration');
const { getCipher, getIV } = require('../utils/getCipher');
const { ClientError } = require('../utils/errors');

const postFile = async (req, res) => {
  try {
    const dirOfFile = appConfiguration.DIR_TO_SAVE_FILE ?? './public/files/';
    const pathToFile = `${dirOfFile}${crypto.randomUUID()}`;
    const writeToFileStream = fs.createWriteStream(pathToFile);
    const gzipStream = createGzip();

    const iv = getIV();
    const secret = req.headers['x-secret-key'];
    if (!secret) {
      throw new ClientError('No secret is provided.');
    }

    const key = await scryptPromisified(secret, 'salt', 24);
    const cipher = getCipher(key, iv);

    cipher.on('end', () => {
      gzipStream.write(iv);
    });

    await pipeline(
      req,
      cipher,
      gzipStream,
      writeToFileStream
    );

    createResponse(req, res, 201, `Path to file - ${pathToFile}`);
  } catch (err) {
    if (err instanceof ClientError) {
      createResponse(req, res, 400, `Bad request: ${err?.message}`);
    }
    else {
      createResponse(req, res, 500, `Internal server error: ${err?.message}`);
    }
  }
};

module.exports = ({ postFile });
