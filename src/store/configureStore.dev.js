import { createStore, compose } from 'redux';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import routes from '../routes';

export default function configureStore(initialState) {
  const store = compose(
    reduxReactRouter({routes, createHistory}),
    DevTools.instrument()
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}


