const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ip = require('ip');
const chalk = require('chalk');
const clearConsole = require('console-clear');

const config = require('./webpack/webpack.dev');
const devServer = config.devServer;
const port = devServer.port;

WebpackDevServer.addDevServerEntrypoints(config, devServer);

const compiler = webpack(config);
compiler.plugin('done', stats => {
  clearConsole();
  if (stats.hasErrors()) {
    process.stdout.write(chalk.red('Build failed!\n\n'));
    let info = stats.toJson('errors-only');
    info.errors.forEach(msg =>
      process.stderr.write(`${chalk.red(' ERROR ')}${msg}\n`)
    );
  } else {
    process.stdout.write(chalk.green('Compiled successfully!\n\n'));
    process.stdout.write(
      `${chalk.bold('Local:')}            http://localhost:${port}\n`
    );
    process.stdout.write(
      `${chalk.bold('Local ip address:')} http://${ip.address()}:${port}\n`
    );
  }
});
const server = new WebpackDevServer(compiler, devServer);
server.listen(port);
