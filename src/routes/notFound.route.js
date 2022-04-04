const { notFoundRouteController } = require('../controllers/notFoundRouteController');

const notFoundRoute = async (req, res) => notFoundRouteController(req, res);

module.exports = ({ notFoundRoute });
