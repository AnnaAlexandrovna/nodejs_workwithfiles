const http = require('http');
const { router } = require('../../routes/index');
const { appConfiguration } = require('../../../appConfiguration');

const port = appConfiguration.PORT ?? 5000;
const hostname = appConfiguration.HOSTNAME ?? 'localhost';
const createWorkerInstance = () => {
  const { pid } = process;
  const server = http.createServer();
  server.on('request', router);
  server.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/ ; Pid - ${pid}`);
  });
};
const createServerForTest = () => {
  const server = http.createServer();
  server.on('request', router);
  server.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/ ;`);
  });
  // eslint-disable-next-line no-console
  process.on('SIGUSR2', () => { server.close(() => { console.log('Process terminated'); }); });
  return server;
};

module.exports = ({ createWorkerInstance, createServerForTest });
