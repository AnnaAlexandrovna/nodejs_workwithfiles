const fs = require('fs');
const { createGunzip } = require('zlib');

const { pipeline } = require('stream/promises');
const { getFileId } = require('../utils/getFileId');
const { createResponse } = require('../utils/createResponse');
const { appConfiguration } = require('../../appConfiguration');
const { ClientError } = require('../utils/errors');

const dirOfFile = appConfiguration.DIR_TO_SAVE_FILE ?? './public/files/';
const getFile = async (req, res) => {
  try {
    const fileId = getFileId(req);
    if (!fileId) {
      throw new ClientError('"fileId" field is empty.');
    }
    res.setHeader('Content-Type', 'application/octet-stream');

    await pipeline(
      fs.createReadStream(`${dirOfFile}${fileId}`),
      createGunzip(),
      res
    );
  } catch (err) {
    if (err instanceof ClientError) {
      createResponse(req, res, 400, `Bad request: ${err?.message}`);
    }
    else {
      res.connection?.destroy();
    }
  }
};
module.exports = ({ getFile });
