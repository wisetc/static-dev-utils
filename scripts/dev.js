process.env.NODE_ENV = 'development';

const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../webpack.config');

const HOST = '0.0.0.0';

choosePort(HOST, 4000).then(port => {
  if (port === null) {
    // continue;
    return;
  }

  const protocol = 'http';

  const urls = prepareUrls(protocol, HOST, port);
  const compiler = createCompiler({
    appName: 'app',
    webpack,
    config,
    urls,
    useYarn: false,
  });
  const devServer = new WebpackDevServer(compiler, { contentBase: 'public' });

  devServer.listen(port, err => {
    if (err) {
      console.log('error accured.');
      return;
    }

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  });
});
