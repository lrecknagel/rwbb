const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getClientEnvironment = require('./env');
const env = getClientEnvironment('');

module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env.stringified),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};