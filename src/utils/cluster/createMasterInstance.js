const cluster = require('cluster');
const os = require('os');
const { restartWorkers } = require('./restartWorkers');

const createMasterInstance = () => {
  const cpuCnt = os.cpus().length;
  for (let i = 0; i < cpuCnt; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code) => {
    if (code === 0 || worker.exitedAfterDisconnect) {
      return;
    }
    cluster.fork();
  });
  process.on('SIGUSR2', () => {
    restartWorkers(0);
  });
};
module.exports = ({ createMasterInstance });
