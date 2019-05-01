import { createStore, compose } from 'redux';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducers';
import routes from '../routes';

export default function configureStore(initialState) {
  const store = compose(
    reduxReactRouter({routes, createHistory})
  )(createStore)(rootReducer, initialState);
  return store;
}


