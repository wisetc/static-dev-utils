// @ts-check
/** @typedef {import('webpack').Configuration} Configuration */
const path = require('path');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/** @type {Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.[hash].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(HTMLWebpackPlugin, { PUBLIC_URL: '' }),
    new HTMLWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
  ],
};