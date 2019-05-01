import { combineReducers } from 'redux';
import filters from './filters';
import favorites from './favorites';
import host from './host';
import filterMenu from './filterMenu';
import selectedPoint from './selectedPoint';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  filters,
  favorites,
  host,
  filterMenu,
  selectedPoint,
  router: routerStateReducer
});

export default rootReducer;
