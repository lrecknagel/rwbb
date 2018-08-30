const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const InterpolateHtmlPlugin = require('../scripts/helper/InterpolateHtmlPlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const env = getClientEnvironment('');

module.exports = browserUrl => ({
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: browserUrl }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // new FaviconsWebpackPlugin(
    //   process.env.NODE_ENV === 'dev'
    //     ? './public/favDev.png'
    //     : process.env.NODE_ENV === 'test'
    //       ? './public/favTest.png'
    //       : './public/favLive.png'
    // ),
    // THIS HAS TO BE THE LAST!
    new InterpolateHtmlPlugin(env.raw),
  ],
});