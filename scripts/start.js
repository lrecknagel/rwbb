process.env.NODE_ENV = 'development';

// Ensure environment variables are read.
require('../config/env');

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');

const paths = require('../config/paths');

const DEFAULT_PORT = parseInt(process.env.npm_package_app_port, 10) || 3010;
const HOST = process.env.HOST || 'localhost';
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';


const webpackCommonConfig = require('../config/webpack.config.common');
const webpackDevConfig = require('../config/webpack.config.dev')(`${ PROTOCOL }://${ HOST }:${ DEFAULT_PORT }`);
const webpackConfig = webpackMerge(webpackCommonConfig, webpackDevConfig);
const webpackConfigOptions = {
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  host: HOST,
  compress: true,
  clientLogLevel: 'none',
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfigOptions);
const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, webpackConfigOptions);
devServer.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }

  console.log(chalk.cyan('Starting the development server...\n'));
  // openBrowser(urls.localUrlForBrowser);
});

['SIGINT', 'SIGTERM'].forEach( sig => {
  process.on(sig, () => {
    devServer.close();
    process.exit();
  });
});