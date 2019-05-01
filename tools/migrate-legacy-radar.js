/*eslint no-console: 0 */

// execute this script by giving the legacy radar as json on stdin.
// i.e:
//
//     $ node migrate-legacy-radar < legacy-radars-raw/techradar2015

'use strict';

const toUrl = require('../src/lib/toUrl');
const _ = require('lodash');
const writeRadar = require('./writeRadar');

function readStdin(cb) {
  let content = '';
  process.stdin.resume();
  process.stdin.on('data', function(buf) { content += buf.toString(); });
  process.stdin.on('end', function() {
    cb(content);
  });
}

readStdin((input) => {
  const legacyRadar = JSON.parse(input);
  const newRadar = legacy2current(legacyRadar);

  const path = `../src/content/${newRadar.id}`;
  writeRadar(newRadar, path);
  //console.log(JSON.stringify(newRadar));
});

const transformLevels = legacy => (
  legacy.map(level => ({
    title: level.name,
    radius: 1 - level.radius
  }))
);

const transformPoint = (legacyPoint, transformScore) => ({
  id: toUrl(legacyPoint.name),
  title: legacyPoint.name,
  score: transformScore(legacyPoint.levelId, legacyPoint.levelFactor),
  markdown: legacyPoint.description,
  tags: []
});

const transformSectorsAndPoints = (legacySectors, legacyPoints, transformScore) => {
  const legacyPointsBySectorId = _.groupBy(legacyPoints, p => p.sectorId);

  const categoryArray = legacySectors.map(legacySector => {
    const categoryLegacyPoints = legacyPointsBySectorId[legacySector.id];
    const points = categoryLegacyPoints.map(
      p => transformPoint(p, transformScore)
    );

    const pointsById = _.indexBy(points, p => toUrl(p.title));
    return {
      title: legacySector.name,
      points: pointsById
    };
  });
  return _.indexBy(categoryArray, c => toUrl(c.title));
};

function legacy2current(legacy) {
  const legacyLevelsById = _.indexBy(legacy.levels, l => l.id);
  const transformScore = (levelId, levelFactor) => (
    (1 - legacyLevelsById[levelId].radius) - 0.01 * levelFactor
  );

  const categories = transformSectorsAndPoints(legacy.sectors, legacy.points, transformScore);
  return {
    id: legacy.url,
    title: legacy.name,
    levels: transformLevels(legacy.levels),
    categories: categories,
    tags: [],
    intro: legacy.ingress
  };
}
