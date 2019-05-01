const path = require('path');
const merge = require('lodash/object/merge');

const sharedConfig = require('../shared');
const virtualPath = require('../../src/config/virtualPath');

const rootDir = path.join(__dirname, '../../');
const publicPath = virtualPath + '/assets/';

const config = merge({
  output: {
    path: path.resolve(rootDir, 'dist', 'assets'),
    filename: 'app.js',
    publicPath: publicPath
  }
}, sharedConfig);

module.exports = config;
