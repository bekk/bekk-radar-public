//if you don't understand this pattern, please read:
//http://rackt.org/redux/docs/recipes/ComputingDerivedData.html
//TL;DR reselect memoizes a selector

import { createSelector } from 'reselect';
import getAllRadarPoints from '../lib/getAllRadarPoints';
import filterPoints, { filterPointsBySearch } from '../lib/filterPoints';
import indexBy from 'lodash/collection/indexBy';
import mapValues from 'lodash/object/mapValues';
import createSearchIndexForRadar from '../lib/createSearchIndexForRadar';
import lunr from 'lunr';
import radarContainers from 'content';

//trivial selectors
const radarIdSelector = state => state.router.params.radarId;
export const pointIdSelector = state => state.router.params.pointId;
export const categoryIdSelector = state => state.router.params.categoryId;
const filtersSelector = state => state.filters;
const searchQuerySelector = state => state.filters.query;
const favoritesSelector = state => state.favorites;

export const radarSelector = state => {
  const container = radarContainers[radarIdSelector(state)];

  if (container) {
    // Find tags used in points and set the radar.tags array.
    container.tags = [].concat(...Object.keys(container.categories).map(category => {
      return [].concat(...Object.keys(container.categories[category].points).map(point => {
        return container.categories[category].points[point].tags;
      }));
    }));
  }

  return container || null;
};

export const categorySelector = state => {
  const radar = radarSelector(state);
  const categoryId = categoryIdSelector(state);
  return categoryId ? radar.categories[categoryId] : null;
};

export const pointSelector = state => {
  const category = categorySelector(state);
  const pointId = pointIdSelector(state);
  return pointId ? category.points[pointId] : null;
};

export const isCurrentPointFavoriteSelector = state => {
  return !!favoritesSelector(state)[pointIdSelector(state)];
};

//memoized selectors

export const allPointsSelector = createSelector([radarSelector], radar => getAllRadarPoints(radar));
const searchIndexSelector = createSelector([radarIdSelector], radarId => {
  const index = createSearchIndexForRadar(radarContainers[radarId]);
  return lunr.Index.load(index);
});

const searchResultsSelector = createSelector(
  [allPointsSelector, searchIndexSelector, searchQuerySelector], (points, searchIndex, query) => {
    return filterPointsBySearch(points, searchIndex, query);
  }
);

export const filteredPointsSelector = createSelector(
  [allPointsSelector, filtersSelector, searchResultsSelector, favoritesSelector], (points, filters, searchResults, favorites) => {
    return filterPoints(points, filters, searchResults, favorites);
  }
);

const filteredPointsByIdSelector = createSelector(filteredPointsSelector, points => indexBy(points, p => p.id));
const allPointsByIdSelector = createSelector(allPointsSelector, points => indexBy(points, p => p.id));

export const allPointsFilterStatusSelector = createSelector(
  [allPointsByIdSelector, filteredPointsByIdSelector], (allPoints, filteredPoints) => mapValues(allPoints, p => !!filteredPoints[p.id])
);

export const currentSelectablePointsSelector = createSelector(
  [filteredPointsSelector, categoryIdSelector], (filteredPoints, categoryId) => {
    return filteredPoints.filter(point => point.categoryId === categoryId);
  }
);

export const nextSelectablePointSelector = createSelector(
  [currentSelectablePointsSelector, pointSelector], (selectablePoints, point) => {
    const currentIndex = selectablePoints.indexOf(point);
    const nextIndex = (currentIndex + 1) % selectablePoints.length;
    return selectablePoints[nextIndex];
  }
);

export const prevSelectablePointSelector = createSelector(
  [currentSelectablePointsSelector, pointSelector], (selectablePoints, point) => {
    const currentIndex = selectablePoints.indexOf(point);
    const prevIndex = (currentIndex + selectablePoints.length - 1) % selectablePoints.length;
    return selectablePoints[prevIndex];
  }
);

