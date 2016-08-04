/* eslint-disable */

'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

var _ = require('lodash');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');


var env = {
  production: process.env.NODE_ENV === 'production',
  mobile: process.env.NODE_ENV === 'mobile',
};

var ip = require("ip");
var ipAddr = ip.address();
var envHost = env.mobile ? ipAddr : 'localhost';

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json'))),
  });
}

if (env.mobile) {
  Object.assign(env, {
    envHost: envHost
  });
}

app.get('/*', function(req, res) {
  res.render('index', {
    env: env
  });
});

var port = Number(process.env.PORT || 4001);
var server = app.listen(port, function () {
  console.log('server running at ' + envHost + ':4001');
});


///production stuff
if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://' + envHost + ':4001', // change this IP for mobile
      'Access-Control-Allow-Headers': 'X-Requested-With'
    },
    // host : envHost, // enable host for mobile

  }).listen(4000, envHost, function (err) { // change this IP for mobile
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on ' + envHost + ':4000');
  });
}
