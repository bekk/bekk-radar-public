/*eslint no-console:0 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { reduxReactRouter, match} from 'redux-router/server';
import { ReduxRouter } from 'redux-router';
import qs from 'query-string';
import { Provider } from 'react-redux';

import getStatusFromRoutes from './lib/getStatusFromRoutes';
import rootReducer from './reducers';
import routes from './server-routes';

function handleRouting( request, response, next ) {

  const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(rootReducer, { host: 'https://radar.bekk.no' });

  function hydrateOnClient(store){
    response.send('<!doctype html>\n' +
      ReactDOMServer.renderToString(
        <Provider store={store} key="provider">
          <ReduxRouter/>
        </Provider>

      ));
  }

  store.dispatch(match(request.originalUrl, (error, redirectLocation, routerState) => {
    if(
      /^\/assets.*$/i.test(request.originalUrl) ||
      /^\/favicon.*$/i.test(request.originalUrl) ||
      /^\/__webpack.*$/i.test(request.originalUrl)
    ){
      next();
      return;
    }
    if (error) {
      console.error('Router error:', error);
      response.status(500).send(error.message);
      hydrateOnClient();
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      response.status(400).send('Not found!');
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }
      const status = getStatusFromRoutes(routerState.routes);
      if (status) {
        response.status(status);
      }

      response.send('<!doctype html>\n' +
          ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxRouter/>
            </Provider>

          ));
      //<Index store={store}/>
    }
  }));

}

module.exports = handleRouting;
