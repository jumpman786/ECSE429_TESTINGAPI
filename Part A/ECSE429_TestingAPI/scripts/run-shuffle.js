const { spawn } = require('child_process');
const glob = require('glob');

const files = glob.sync('test/**/*.spec.js', { nodir: true });
files.sort(() => Math.random() - 0.5); // simple shuffle
const mochaBin = './node_modules/.bin/mocha';

const child = spawn(mochaBin, ['--timeout','15000', ...files], { stdio: 'inherit', shell: true });
child.on('exit', code => process.exit(code));
