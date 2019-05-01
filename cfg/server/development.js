const webpack = require('webpack');
const merge = require('lodash/object/merge');
const path = require('path');
const NodeExternals = require('webpack-node-externals');

const nodeModules = new NodeExternals();
const test_expressions = {
  images : /\.(png|jpg|gif)$/i,
  radars: /(.*\.)?radar.yml$/i,
  javascript: /\.(js|jsx)$/i
};

const rootDir = path.join(__dirname, '../../');
const srcPath = path.join(rootDir, 'src');
const baseConfig = require('./base');

const config = merge({
  progress: true,
  debug: true,
  cache: false,
  devtool: 'eval',
  externals: [nodeModules],
  entry: [
    path.join(rootDir,'servers', 'server.dev.js')
  ],
  module: {
    loaders: [{
      test: test_expressions.images,
      loader: 'url-loader?limit=8192&name=[path][name].[ext]?[hash]'
    },{
      test: test_expressions.radars,
      loader: 'radar-loader'
    },{
      test: test_expressions.javascript,
      loader: 'babel',
      include: srcPath,
      exclude: 'node_modules',
      query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    }]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|less|styl|svg|gif|ico)$/i, 'node-noop')
  ]
}, baseConfig);

module.exports = config;
