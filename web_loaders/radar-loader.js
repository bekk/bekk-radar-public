'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const validateRadar = require('../src/lib/validateRadar');
const lintConfig = require('../tools/markdownlint.config');
const markdownlint = require('markdownlint');
const path = require('path');

function checkRadar(radar, emitWarning) {
  const result = validateRadar(radar);
  if(!result.valid) {
    result.errors.forEach(e => {
      emitWarning(`${e.message} at \n${e.dataPath}`);
    });
  }
}

function lintMarkdown(file, emitWarning) {
  const result = markdownlint.sync({
    files: [file],
    config: lintConfig
  });

  if(Object.keys(result[file]).length) {
    emitWarning(result.toString());
  }
}

module.exports = function(source) {
  this.cacheable();
  const callback = this.async();
  const radar = yaml.safeLoad(source);
  const pathArr = this.resourcePath.split(path.sep);
  radar.id = pathArr[pathArr.length-2];
  let filesToLoad = 0;
  const cbIfFinished = () => {
    if(filesToLoad === 0) {
      checkRadar(radar, thisLoader.emitWarning);
      const res = 'module.exports = ' + JSON.stringify(radar);
      callback(null, res);
    }
  };

  const thisLoader = this;

  //load intro
  ++filesToLoad;
  thisLoader.resolve(thisLoader.context, './intro.md', function(resolveErr, mdPath) {
    if(resolveErr) {
      //callback(resolveErr, null);
      radar.intro = '';
      --filesToLoad;
      cbIfFinished();
      return;
    }
    thisLoader.addDependency(mdPath);
    fs.readFile(mdPath, 'utf8', function (fsErr, markdown) {
      if(fsErr) {
        callback(fsErr, null);
      }
      radar.intro = markdown;
      --filesToLoad;
      cbIfFinished();
    });
  });

  //load points from markdown
  Object.keys(radar.categories).forEach(categoryId => {
    const category = radar.categories[categoryId];
    category.id = categoryId;
    category.radarId = radar.id;
    Object.keys(category.points).forEach(pointId => {
      ++filesToLoad;
      const point = category.points[pointId];
      const relPath = `./points/${pointId}.md`;
      thisLoader.resolve(thisLoader.context, relPath, function(resolveErr, mdPath) {
        if(resolveErr) {
          callback(resolveErr, null);
        }
        lintMarkdown(mdPath, thisLoader.emitWarning);
        thisLoader.addDependency(mdPath);
        fs.readFile(mdPath, 'utf8', function (fsErr, markdown) {
          if(fsErr) {
            callback(fsErr, null);
          }
          point.markdown = markdown;
          point.id = pointId;
          point.categoryId = categoryId;
          point.radarId = radar.id;
          --filesToLoad;
          cbIfFinished();
        });
      });
    });
  });
};
