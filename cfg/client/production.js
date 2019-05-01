const webpack = require('webpack');
const merge = require('lodash/object/merge');
const path = require('path');
const virtualPath = require('../../src/config/virtualPath');
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

const baseConfig = require('./base');

const config = merge({
  entry: './src/boot-client',
  cache: true,
  devtool: 'sourcemap',
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
        presets: ['es2015', 'stage-1', 'react']
      }
    }]
  },
  stylus: {
    use: [
      poststylus([
        autoprefixer({browsers: 'last 2 versions, > 1%'})
      ])
    ]
  },
  stylint: JSON.parse(fs.readFileSync(path.join(__dirname, '../../.stylintrc'), 'utf-8')),
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BEKKRADAR_VIRTUAL_PATH': JSON.stringify(virtualPath)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig);

module.exports = config;
