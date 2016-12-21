//  type this in the terminal to run the webpack: node_modules/.bin/webpack

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'client', 'public', 'static'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  module: {
    loaders: [{
      test: path.join(__dirname, 'client/src'),
      loader: 'babel',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader!postcss-loader'
      )
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./client/public/style.css'),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ]
};
