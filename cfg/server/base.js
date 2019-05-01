const path = require('path');
const merge = require('lodash/object/merge');

const sharedConfig = require('../shared');
const virtualPath = require('../../src/config/virtualPath');

const port = 8000;
const rootDir = path.join(__dirname, '../../');
const publicPath = virtualPath + '/assets/';

const config = merge({
  port: port,
  target: 'node',
  // Ref: https://github.com/webpack/webpack/issues/1599#issuecomment-186841345
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.resolve(rootDir, 'bin'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: publicPath
  }
}, sharedConfig);

module.exports = config;
