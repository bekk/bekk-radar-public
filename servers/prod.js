/*eslint no-console:0 */
require('babel-polyfill');
const path = require('path');
const express = require('express');
const compression = require('compression');

const port = process.env.BEKKRADAR_PORT || 8080;
const app = express();
const rootDir = path.resolve(__dirname, '..');

console.log(process.env);

app.use(compression());

app.get('/health', (req, res) => res.send('healthy'));

app.use(`/assets`, express.static(path.join(rootDir, 'dist','assets')));

const redirects = {
  '/old/techradar2013': '/tech2013',
  '/old/techradar2014': '/tech2014',
  '/techradar2015': '/tech2015',
  '/techradar': '/'
};

Object.keys(redirects).map(from => {
  app.get(from, function(req, res) {
    res.redirect(301, redirects[from]);
  });
});

app.use(require('../src/boot-server'));

if (port) {
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
