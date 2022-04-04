const { getFile } = require('../controllers/getFile');
const { postFile } = require('../controllers/postFile');
const { createResponse } = require('../utils/createResponse');
const { isBodyEmpty } = require('../utils/isBodyEmpty');

const getUnzipFile = async (req, res) => getFile(req, res);

const postNewFile = async (req, res) => {
  try {
    isBodyEmpty(req);
    postFile(req, res);
  } catch (err) {
    createResponse(req, res, 400, `Bad request: ${err?.message}`);
  }
};

module.exports = ({ getUnzipFile, postNewFile });
