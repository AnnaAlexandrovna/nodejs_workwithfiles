const crypto = require('crypto');
const { getUnzipFile, postNewFile } = require('./files.route');
const { notFoundRoute } = require('./notFound.route');
const { getUrlAndMethodObject } = require('../utils/getUrlAndMethodObject');
const { postEvalCommand } = require('./eval.route');

const router = async (req, res) => {
  const { method, url } = getUrlAndMethodObject(req);
  const requestId = crypto.randomUUID();
  req.headers.id = requestId;
  
  if (method === 'GET' && url.length === 3 && url[1] === 'files') {
    await getUnzipFile(req, res);
  } else if (method === 'POST' && url.length === 2 && url[1] === 'files') {
    await postNewFile(req, res);
  } else if (method === 'POST' && url.length === 2 && url[1] === 'eval') {
    await postEvalCommand(req, res);
  } else {
    await notFoundRoute(req, res);
  }
};
module.exports = ({ router });
