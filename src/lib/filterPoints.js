import intersection from 'lodash/array/intersection';
import some from 'lodash/collection/some';

export default function filterPoints(points, filters, searchResults, favorites){
  const byTags = filters.tags.length > 0 ? filterPointsByTags(points, filters.tags) : points;
  const byFavorites = filters.favorites ? filterPointsByFavorites(points, favorites) : points;

  return intersection(searchResults, byTags, byFavorites);
}

export function filterPointsBySearch(points, index, query) {
  if(query === '') {
    return points;
  }
  const results = index.search(query);
  let matchingIds = results.map(r => r.ref);
  const matchingPoints = points.filter(p => some(matchingIds, id => id === p.id));
  return matchingPoints;
}

function filterPointsByTags(points, tags) {
  const pointsWithTags = points.filter(point => (
    some(point.tags, pointTag => (
      some(tags, t => t === pointTag)
    ))
  ));
  return pointsWithTags;
}

function filterPointsByFavorites(points, favorites) {
  return points.filter(p => favorites[p.id]);
}
