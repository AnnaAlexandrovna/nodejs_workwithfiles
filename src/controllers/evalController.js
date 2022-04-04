const { runCommand } = require('../utils/vm/runCommandOnVM');
const { createResponse } = require('../utils/createResponse');
const { appConfiguration } = require('../../appConfiguration');
const { ClientError } = require('../utils/errors');

const bufferThreshold = parseInt(appConfiguration.BUFFER_THRESHOLD, 10) ?? 10000;
const evalController = (req, res) => {
  let payload = '';

  req.on('data', (chunk) => {
    if (payload.length + chunk.length < bufferThreshold) {
      payload += chunk;
    } else {
      req.destroy(new ClientError('Payload Too Large'));
    }
  });

  req.on('error', (err) => {
    createResponse(req, res, 400, `Bad request: ${err?.message}`);
  });

  req.on('end', () => {
    let result = runCommand(payload);

    createResponse(req, res, 200, result);
  });
};
module.exports = ({ evalController });
