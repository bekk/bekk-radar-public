/*eslint no-console: 0*/

const markdownlint = require('markdownlint');
const config = require('./markdownlint.config.js');
const glob = require('glob');

glob('./src/**/*.md', {}, (err, files) => {
  if(err) {
    throw err;
  }
  console.log(markdownlint.sync({
    files,
    config
  }).toString());
});
