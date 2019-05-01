import { ADD_FAVORITE, REMOVE_FAVORITE, RESTORE_FAVORITES } from '../actions/actionTypes';

export default function favorites(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, [action.point.id]: true };
    case REMOVE_FAVORITE: {
      const { [action.point.id]: pointToExclude, ...newState } = state;
      return newState;
    }
    case RESTORE_FAVORITES:
      return action.favorites;
    default:
      return state;
  }
}
