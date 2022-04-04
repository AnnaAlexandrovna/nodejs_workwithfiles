const getFileId = (req) => req.url.split('/').pop();
module.exports = ({ getFileId });
