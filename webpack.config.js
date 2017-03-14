var path = require('path');
var webpack = require('webpack');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  entry: __dirname + '/src/scripts/main.js',
  output: {
    filename: 'build.js',
    path: __dirname + '/src/'
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015', 'react']} },
      { test: /\.scss/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
       }
    })
  ]
};
