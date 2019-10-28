const childProcess = require('child_process');
const os = require('os');

const countWorkers = os.cpus().length;
const workers = [];

for (let i = 0; i < countWorkers; i++) {
  const worker = childProcess.fork('./child_process/worker.js');
  console.log(`Worker is creating ${worker.pid}`);
  workers.push(worker);
}

const tasks = [1, 2,3,4,5,6,7,8,9,11,12,13,14];
const results = [];

workers.forEach((worker) => {

  worker.send({ tasks });
  worker.on('message', (message) => {
    results.push(message);
    console.log('message from worker', message);
    if (results.length === countWorkers) {
      process.exit(0);
    }
  });

  worker.on('exit', (code) => {
    console.log('worker exit with code', worker.pid, code);
  });
});
