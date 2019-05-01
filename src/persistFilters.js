import { restoreFilters } from './actions';
import hasLocalStorage from './lib/hasLocalStorage';

export default store => {
  if(!hasLocalStorage) {
    return;
  }

  store.subscribe(() => {
    const filters = store.getState().filters;
    localStorage.setItem('filters', JSON.stringify(filters));
  });

  const filtersToRestore = JSON.parse(localStorage.getItem('filters'));
  if(filtersToRestore) {
    store.dispatch(restoreFilters(filtersToRestore));
  }
};
