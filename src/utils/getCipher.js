const crypto = require('crypto');
const { appConfiguration } = require('../../appConfiguration');

const algorithm = appConfiguration.ALGORITHM ?? 'aes192';
const ivSize = parseInt(appConfiguration.IV_SIZE, 10) ?? 16;
const getIV = () => crypto.randomBytes(ivSize);
const getCipher = (key, iv) => crypto.createCipheriv(algorithm, key, iv);
module.exports = ({
  getCipher, algorithm, ivSize, getIV,
});
