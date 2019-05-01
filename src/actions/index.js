import * as types from './actionTypes';
import { replaceState, push } from 'redux-router';
import { buildUrlToPoint, buildUrlToCategory, buildUrlToRadar } from '../lib/urlBuilders';
import buildPointHistory from '../lib/buildPointHistory';

export function addTagFilter(tag) {
  return { type: types.ADD_FILTER_TAG, tag };
}

export function removeTagFilter(tag) {
  return { type: types.REMOVE_FILTER_TAG, tag };
}

export function addFavoritesFilter() {
  return { type: types.ADD_FILTER_FAVORITES };
}

export function removeFavoritesFilter() {
  return { type: types.REMOVE_FILTER_FAVORITES };
}

export function setSearchQuery(query) {
  return { type: types.SET_SEARCH_QUERY, query };
}

export function setFirstSelectedPoint(pointId) {
  return { type: types.SET_FIRST_SELECTED_POINT, pointId };
}

export function dismissFirstSelectedPoint() {
  return { type: types.DISMISS_FIRST_SELECTED_POINT };
}

export function resetFilter() {
  return { type: types.RESET_FILTER };
}

export function addFavorite(point) {
  return { type: types.ADD_FAVORITE, point };
}

export function restoreFavorites(favorites) {
  return { type: types.RESTORE_FAVORITES, favorites };
}

export function restoreFilters(filters) {
  return { type: types.RESTORE_FILTERS, filters };
}

export function removeFavorite(point) {
  return { type: types.REMOVE_FAVORITE, point };
}

export function openFilterMenu() {
  return { type: types.OPEN_FILTER_MENU };
}

export function closeFilterMenu() {
  return { type: types.CLOSE_FILTER_MENU };
}

export function getPointHistory(point, radarId) {

  const pointHistory = buildPointHistory(point, radarId);
  // dummy for now
  return { type: types.GET_POINT_HISTORY, pointHistory};
}

export function selectPoint(point) {
  const urlToPoint = buildUrlToPoint(point);
  return push(urlToPoint);
}

export function selectCategory(category) {
  const urlToCategory = buildUrlToCategory(category.radarId, category.id);
  return push(urlToCategory);
}

export function dismissPoint(category){
  const urlToCategory = buildUrlToCategory(category.radarId, category.id);
  return replaceState(null, urlToCategory);
}

export function selectRadar(radar){
  const urlToRadar = buildUrlToRadar(radar);
  return replaceState(null, urlToRadar);
}
