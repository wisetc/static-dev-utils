// @ts-check
/** @typedef {import('webpack').Configuration} Configuration */
const path = require('path');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = './';
const publicUrl = publicPath.slice(0, -1);

/** @type {Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.[contenthash:8].js',
    path: path.join(__dirname, 'build'),
    publicPath,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        use:
          process.env.NODE_ENV === 'production'
            ? [MiniCssExtractPlugin.loader, 'css-loader']
            : ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(HTMLWebpackPlugin, { PUBLIC_URL: publicUrl }),
    new HTMLWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ],
};
