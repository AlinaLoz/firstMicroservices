const calculating = item => item * 2;

process.on('message', (message) => {
  console.log('message from master message: ', message);
  console.log('inside child process', process.pid);
  const result = message.tasks.map((task) => calculating(task));
  process.send({ result  });
});
