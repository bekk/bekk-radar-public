import React from 'react';
import { render }  from 'react-dom';

import 'what-input';
import 'inert-polyfill';

import configureStore from './store/configureStore';
import Root from './containers/Root';
import persistFavorites from './persistFavorites';
import persistFilters from './persistFilters';
import manageTitle from './manageTitle';
import preLoadImages from './content/preLoadImages';
import hasLocalStorage from './lib/hasLocalStorage';

window.$REDUX_DEVTOOL = false;

function clearQueryFiltersInLocalStorage() {
  if(!hasLocalStorage){
    return;
  }
  const filters = JSON.parse(localStorage.getItem('filters'));
  if(!filters){
    return;
  }
  filters.query = '';
  localStorage.setItem('filters', JSON.stringify(filters));
}

const store = configureStore( {} );


clearQueryFiltersInLocalStorage();
persistFavorites(store);
persistFilters(store);
manageTitle(store);

const rootElement = document.getElementById('app');

preLoadImages();

render(
  <Root store={store} />,
  rootElement
);
