process.env.NODE_ENV = 'production';

const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const config = require('../webpack.config');

async function rmBuildDirContent() {
  const dirname = 'build';
  const s = path.resolve(__dirname, '..', dirname);
  const { stdout, stderr } = await exec('rm -rf ' + s + '/*');
  console.log(stdout);
  if (stderr) {
    console.log(stderr);
  }
}

async function build() {
  await rmBuildDirContent();
  copyPublicFolder();
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      console.log('catch an error, ' + err.message);
      return;
    }

    console.log('OK.');
  });
}

build();

function copyPublicFolder() {
  fs.copySync(path.resolve('public'), path.resolve('build'), {
    dereference: true,
    filter: file => file !== path.resolve('public/index.html'),
  });
}
