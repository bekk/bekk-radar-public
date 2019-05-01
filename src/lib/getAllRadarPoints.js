import map from 'lodash/collection/map';

export default function getAllRadarPoints(radar) {
  let points = [];
  map(radar.categories, c => map(c.points, p => points.push(p)));
  points.sort((a, b) => a.score - b.score);
  return points;
}
