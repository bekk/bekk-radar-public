var path = require('path');
var srcPath = path.join(__dirname, '/../../src');

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|styl|svg)$/,
        loader: 'null-loader'
      },
      {
        test: /(.*\.)?radar.yml$/,
        loader: 'radar-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: [ 'babel' ],
        include: [ srcPath ],
        exclude: 'node_modules'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: srcPath + '/actions/',
      helpers: srcPath + '/test/helpers',
      components: srcPath + '/components/',
      containers: srcPath + '/containers/',
      content: srcPath + '/content/',
      store: srcPath + '/store/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/test'
    }
  }
};
