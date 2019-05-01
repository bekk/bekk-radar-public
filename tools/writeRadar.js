/*eslint no-console: 0 */
'use strict';

const _ = require('lodash');
const fs = require('fs');
const yaml = require('js-yaml');

function writeMdFile(path, md) {
  console.log(path);
  fs.writeFile(path, md, function(err) {
    if (err) {
      throw err;
    }
  });
}

module.exports = function writeRadar(parsedData, directoryPath) {
  if(!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  const pointsDir = `${directoryPath}/points`;
  if(!fs.existsSync(pointsDir)) {
    fs.mkdirSync(pointsDir);
  }

  var introMd = parsedData.intro;
  if(introMd) {
    writeMdFile(`${directoryPath}/intro.md`, introMd);
  }

  _.forOwn(parsedData.categories, c => _.forOwn(c.points, p => {
    writeMdFile(`${directoryPath}/points/${p.id}.md`, p.markdown);
  }));

  //clean up redundant props (implicit in indexing and paths)
  delete parsedData.id;
  delete parsedData.intro;

  _.forOwn(parsedData.categories, c => _.forOwn(c.points, p => {
    delete(p.markdown);
    delete(p.categoryId);
    delete(p.radarId);
    delete(p.id);
  }));
  _.forOwn(parsedData.categories, c => {
    delete(c.id);
    delete(c.radarId);
    delete(c.coverUrl);
  });

  const yamlData = yaml.safeDump(parsedData);
  const yamlPath = `${directoryPath}/radar.yml`;
  fs.writeFile(yamlPath, yamlData, function(err) {
    if (err) {
      throw err;
    }
    console.log(yamlPath);
  });
};
