const appConfiguration = {
  PORT: '5001',
  DIR_TO_SAVE_FILE: './public/files/',
  NUM_OF_BYTES_TO_FILENAME: '16',
  ALGORITHM: 'aes192',
  IV_SIZE: '16',
  HOSTNAME: 'localhost',
  NODE_ENV: 'develop',
  BUFFER_THRESHOLD: '10000',
  URL_PROTOCOL: 'http://',
};
module.exports = ({ appConfiguration });
