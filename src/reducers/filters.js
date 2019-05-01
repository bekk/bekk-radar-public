import uniq from 'lodash/array/uniq';
import without from 'lodash/array/without';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  query: '',
  tags: [],
  favorites: false,
  points : []
};

export default function filters(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case actionTypes.RESET_FILTER:
      return initialState;

    case actionTypes.ADD_FILTER_TAG:
      return { ...state, tags: uniq(state.tags.concat([action.tag]))};

    case actionTypes.REMOVE_FILTER_TAG:
      return { ...state, tags: without(state.tags, action.tag)};

    case actionTypes.SET_SEARCH_QUERY:
      return { ...state, query: action.query };

    case actionTypes.ADD_FILTER_FAVORITES:
      return { ...state, favorites: true };

    case actionTypes.RESTORE_FILTERS:
      return action.filters;

    case actionTypes.REMOVE_FILTER_FAVORITES:
      return { ...state, favorites: false };

    default: return state;
  }
}
