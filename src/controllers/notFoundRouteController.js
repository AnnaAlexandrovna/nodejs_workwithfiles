const { createResponse } = require('../utils/createResponse');

const notFoundRouteController = async (req, res) => {
  createResponse(req, res, 404, 'Selected route not found!');
};
module.exports = ({ notFoundRouteController });
