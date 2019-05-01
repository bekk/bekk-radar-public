import { OPEN_FILTER_MENU, CLOSE_FILTER_MENU, ADD_FILTER_FAVORITES, RESET_FILTER, SET_SEARCH_QUERY } from '../actions/actionTypes';

export default function(state = {open: false}, action) {
  switch(action.type) {
    case OPEN_FILTER_MENU:
      return {open: true};
    case CLOSE_FILTER_MENU:
    case ADD_FILTER_FAVORITES:
    case RESET_FILTER:
    case SET_SEARCH_QUERY:
      return {open: false};
    default:
      return state;
  }
}
