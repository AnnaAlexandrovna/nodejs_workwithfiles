const { appConfiguration } = require('../../appConfiguration')

const getUrlAndMethodObject = (req) => {
  const pathName = new URL(req.url, `${appConfiguration.URL_PROTOCOL}${req.headers.host}`).pathname;
  return { url: pathName.split('/'), method: req.method };
};
module.exports = ({ getUrlAndMethodObject });
