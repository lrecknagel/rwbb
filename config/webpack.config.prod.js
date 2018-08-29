const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const getClientEnvironment = require('./env');
const env = getClientEnvironment('');

module.exports = {
  mode: 'development',
  bail: true,
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.servedPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
  },
};