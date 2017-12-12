const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ip = require('ip');

const config = require('./webpack/webpack.dev');
const devServer = config.devServer;

WebpackDevServer.addDevServerEntrypoints(config, devServer);
const port = devServer.port;

const compiler = webpack(config);
compiler.plugin('done', stats => {
  if (stats.hasErrors()) {
    console.error('Build failed!');
  } else {
    console.log(`Local:            http://localhost:${port}`);
    console.log(`Local ip address: http://${ip.address()}:${port}`);
  }
});
const server = new WebpackDevServer(compiler, devServer);
server.listen(port);
