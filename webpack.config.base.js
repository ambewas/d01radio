/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
  mobile: NODE_ENV === 'mobile',
};

var ip = require("ip");
var ipAddr = ip.address();
var envHost = env.mobile ? ipAddr : 'localhost';

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',

  entry: [
    'babel-polyfill',
    './client/main.jsx'
  ],

  output: {
    path: path.join(process.cwd(), '/client'),
    pathInfo: true,
    publicPath: 'http://' + envHost + ':4000/client/', // change this IP for mobile
    filename: 'main.js'
  },

  resolve: {
    // root: path.join(__dirname, ''),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', '.json'],
    modulesDirectories: [
      'web_modules',
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      'client'
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    // new ExtractTextPlugin('main.css', { allChunks: true }),

  ],

  module: {
    loaders: [
      { test: /\.jp?g$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.ogg$/, loader: 'file-loader' },
      { test: /\.mp4$/, loader: 'file-loader' },
      { test: /\.mp3$/, loader: 'file-loader' },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?\S*)?$/,
        loader: 'url-loader'
      }
    ],

    noParse: /\.min\.js/
  },
  sassLoader: {
    data: '@import "' + path.resolve(__dirname, 'client/scss/variables.scss') + '";',
    includePaths: [path.resolve(__dirname, 'node_modules/react-toolbox'), 'client']
  }
};
