const cluster = require('cluster');

const restartWorkers = (workerIndx) => {
  const workers = Object.values(cluster.workers);
  const worker = workers[workerIndx];
  if (!worker) {
    return;
  }
  worker.on('exit', () => {
    if (!worker.exitedAfterDisconnect) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`Restarting worker number ${workerIndx}`);
    cluster.fork().on('listening', () => {
      if (workerIndx + 1 <= workers.length) {
        restartWorkers(workerIndx + 1);
      }
    });
  });
  worker.disconnect();
};

module.exports = ({ restartWorkers });
