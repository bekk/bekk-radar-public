const webpack = require('webpack');
const merge = require('lodash/object/merge');
const path = require('path');
const NodeExternals = require('webpack-node-externals');
const virtualPath = require('../../src/config/virtualPath');

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
  debug: false,
  cache: true,
  devtool: 'eval',
  externals: [nodeModules],
  entry: [
    path.join(rootDir,'servers', 'prod.js')
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
    new webpack.NormalModuleReplacementPlugin(/\.(css|less|styl|gif|ico)$/i, 'node-noop'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BEKKRADAR_VIRTUAL_PATH': JSON.stringify(virtualPath),
        'BEKKRADAR_CAS_URL': JSON.stringify(process.env.BEKKRADAR_CAS_URL),
        'BEKKRADAR_CAS_CALLBACK_URL': JSON.stringify(process.env.BEKKRADAR_CAS_CALLBACK_URL)
      }
    })
  ]
}, baseConfig);

module.exports = config;
