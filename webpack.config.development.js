'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');


var ip = require("ip");
var ipAddr = ip.address();
var envHost = process.env.NODE_ENV === 'mobile' ? ipAddr : 'localhost';

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://' + envHost + ':4000', // change this IP for mobile
    'webpack/hot/dev-server'
  ].concat(config.entry);
}

config.devtool = 'cheap-module-eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.scss$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass'},
  {test: /\.jsx?$/, loaders: [ 'react-hot', 'babel'], exclude: /node_modules/}
]);

module.exports = config;
