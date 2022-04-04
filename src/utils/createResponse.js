const createResponse = (req, res, code, message) => {
  if (typeof message === 'string') {
    res.setHeader('Content-Length', Buffer.byteLength(message));
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(code);
    res.end(message);
  } else {
    res.statusCode = code;
    res.writeHead(code);
    res.end();
  }
};

module.exports = ({ createResponse });
