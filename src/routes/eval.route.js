const { evalController } = require('../controllers/evalController');
const { isBodyEmpty } = require('../utils/isBodyEmpty');
const { createResponse } = require('../utils/createResponse');

const postEvalCommand = async (req, res) => {
  try {
    isBodyEmpty(req);
    evalController(req, res);
  } catch (err) {
    createResponse(req, res, 400, `Bad request: ${err?.message}`);
  }
};
module.exports = ({ postEvalCommand });
