const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcPath = path.join(rootDir, 'src');

module.exports = {
  context: rootDir,
  resolveLoader: {
    alias: {
      'radar-loader': path.join(rootDir, 'web_loaders', 'radar-loader.js')
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.styl', '.css'],
    alias: {
      actions: srcPath + '/actions/',
      servers: path.join(rootDir, 'servers'),
      cfg: path.join(rootDir, 'cfg'),
      components: srcPath + '/components/',
      containers: srcPath + '/containers/',
      content: srcPath + '/content/',
      store: srcPath + '/store/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/' + process.env.NODE_ENV
    }
  }
};
