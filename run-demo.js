const { lstatSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const { spawn } = require('child_process');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const demos = getDirectories(resolve(__dirname, 'demo'));

const processes = demos.map(demo => {
  const process = spawn('node', ['index.js'], {
    cwd: demo,
    stdio: ['ignore', 1, 2]
  });

  return process;
});

process.on('SIGINT', function() {
  processes.forEach(process => process.kill('SIGINT'));
  console.log('Killing demos');
  process.exit();
});
