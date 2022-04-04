const { ClientError } = require('./errors');

const isBodyEmpty = (req) => {
  if (req.headers['content-length'] > 0) {
    return;
  }
  throw new ClientError('Invalid empty payload');
};
module.exports = ({ isBodyEmpty });
