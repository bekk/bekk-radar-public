import { REDUX_ROUTER_DID_CHANGE, SET_FIRST_SELECTED_POINT, DISMISS_FIRST_SELECTED_POINT } from '../actions/actionTypes';

export default function selectedPoint(state = { pointId: false, dismissed: true}, action) {
  switch (action.type) {
    case SET_FIRST_SELECTED_POINT:
      return { ...state, pointId: action.pointId, dismissed: false };
    case DISMISS_FIRST_SELECTED_POINT:
      return { ... state, pointId: state.pointId, dismissed: true };
    case REDUX_ROUTER_DID_CHANGE: {
      if(!action.payload.params.pointId && state.pointId){
        return { ... state, pointId: state.pointId, dismissed: true };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
