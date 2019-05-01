import { restoreFavorites } from './actions';
import hasLocalStorage from './lib/hasLocalStorage';

export default store => {
  if(!hasLocalStorage) {
    return;
  }

  store.subscribe(() => {
    const favorites = store.getState().favorites;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });

  const favoritesToRestore = JSON.parse(localStorage.getItem('favorites'));
  if(favoritesToRestore) {
    store.dispatch(restoreFavorites(favoritesToRestore));
  }
};
