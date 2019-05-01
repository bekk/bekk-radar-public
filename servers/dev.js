/*eslint no-console:0 */
require('babel-register');
const express = require('express');
const webpack = require('webpack');
const config = require('../client.webpack.config');
const path = require('path');

const compiler = webpack(config);
const app = new express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  stats: {
    colors: true,
    chunks: false,
    timings: false,
    version: false
  },
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..','src','index.html'));
});

app.listen(config.port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('----\n==> 💻  Open up http://localhost:%s/ in your browser.', config.port, config.port);
  }
});



