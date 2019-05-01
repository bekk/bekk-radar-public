import _ from 'lodash';
import getAvailableRadars from '../lib/getAvailableRadars';
import getLevelForScore from '../lib/getLevelForScore';
import radarContainers from '../content';

const radars = getAvailableRadars(radarContainers);

const getPointScoreAcrossRadars = (radars, point, pointsArray ) => {
  pointsArray = pointsArray || [];
  let level;
  let foundPoint = false;

  _.each(radars, function(radar){
    foundPoint = false;
    _.each(radar.categories, (category) => {

      const gotPoint = category.points[point.id];

      if(gotPoint){
        foundPoint = true;
        level = getLevelForScore(radar.levels, gotPoint.score);
        pointsArray.push({radar: radar.id, level, category: category.id});
      }
    });

    if(!foundPoint){
      pointsArray.push({radar: radar.id, level: 'Ingen historikk funnet', category: null});
    }
  });

  return pointsArray;
};

const getRadarType = (radarId) => {
  if(radarId.indexOf('tech20') !== -1){
    return 'tech';
  } else if(radarId.indexOf('ux20') !== -1){
    return 'ux';
  }
  return null;
};

const isTechRadar = (radarId) => {
  return getRadarType(radarId) === 'tech';
};

const isUXRadar = (radarId) => {
  return getRadarType(radarId) === 'ux';
};

export default (point, radarId) => {
  const techRadars = _.filter(radars, (radar) => { return isTechRadar(radar.id); });
  const uxRadars = _.filter(radars, (radar) => { return isUXRadar(radar.id); });

  if(isTechRadar(radarId)){
    return getPointScoreAcrossRadars(techRadars, point);
  } else if(isUXRadar(radarId)){
    return getPointScoreAcrossRadars(uxRadars, point);
  }
  return null;
};
