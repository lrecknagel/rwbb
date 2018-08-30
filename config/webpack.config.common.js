const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');
const env = getClientEnvironment('');

const devMode = process.env.NODE_ENV === 'development';

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
  stats: {
    colors: true,
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                  browsers: ["last 2 versions"]
              },
              plugins: () => [
                  autoprefixer
              ]
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: paths.appSrc,
        use: ['style-loader', 'css-loader', 'sass-loader?sourceMap=true'],
      },
    ],
  },
};