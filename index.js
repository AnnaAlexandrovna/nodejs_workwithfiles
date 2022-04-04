const cluster = require('cluster');
const { createMasterInstance } = require('./src/utils/cluster/createMasterInstance');
const { createWorkerInstance } = require('./src/utils/cluster/createWorkerInstance');

const startApp = () => {
  if (cluster.isMaster) {
    createMasterInstance();
  } else {
    createWorkerInstance();
  }
};
startApp();
module.exports = ({ startApp });
