const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = browserUrl => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: browserUrl }),
  ],
  mode: 'development',
});