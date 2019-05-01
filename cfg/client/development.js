const webpack = require('webpack');
const merge = require('lodash/object/merge');
const path = require('path');
const virtualPath = require('../../src/config/virtualPath');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const poststylus = require('poststylus');

const test_expressions = {
  images : /\.(png|svg|ico|jpg|gif)$/i,
  stylus : /\.styl$/i,
  css : /\.css$/i,
  fonts: /\.(woff|woff2|eot|ttf)$/i,
  radars: /(.*\.)?radar.yml$/i,
  javascript: /\.(js|jsx)$/i
};
const rootDir = path.join(__dirname, '../../');
const srcPath = path.resolve(rootDir, 'src');
const publicPath = virtualPath + '/assets/';

const baseConfig = require('./base');

const config = merge({
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    publicPath: publicPath,
    noInfo: false,
    port: 8000
  },
  port: 8000,
  target: 'web',
  progress: true,
  debug: true,
  cache: false,
  devtool: 'eval',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/boot-client'
  ],
  stylus: {
    use: [
      poststylus([
        autoprefixer({browsers: 'last 2 versions, > 1%'})
      ])
    ]
  },
  stylint: JSON.parse(fs.readFileSync(path.join(__dirname, '../../.stylintrc'), 'utf-8')),
  module: {
    noParse: [/autoit\.js$/],
    preLoaders: [{
      test: test_expressions.stylus,
      loader: 'stylint'
    },{
      test: test_expressions.javascript,
      loader: 'eslint-loader',
      include: srcPath,
      exclude: 'node_modules'
    }],
    loaders: [{
      test: test_expressions.css,
      // loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader')
      loader: 'style!css'
    },{
      test: test_expressions.stylus,
      // loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader', 'stylus-loader')
      loader: 'style-loader!css-loader!stylus-loader'
    },{
      test: test_expressions.images,
      loader: 'url-loader?limit=8192&name=[path][name].[ext]?[hash]'
    },{
      test: test_expressions.fonts,
      loader: 'url-loader?limit=2&name=[path][name].[ext]?[hash]'
    },{
      test: test_expressions.radars,
      loader: 'radar-loader'
    },{
      test: test_expressions.javascript,
      loader: 'babel',
      include: srcPath,
      exclude: 'node_modules',
      query: {
        presets: ['es2015', 'stage-1', 'react'],
        env: {
          development: {
            plugins: [['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              },{
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            }]]
          }
        }
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig);

module.exports = config;
