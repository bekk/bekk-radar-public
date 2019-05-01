/*eslint-env node, mocha */
/*global expect */
import TestUtils from 'react-addons-test-utils';

import createComponent from 'helpers/shallowRenderHelper';

import App from 'containers/App';
import configureStore from 'store/configureStore';
import { pushState } from 'redux-router';

describe('App', () => {
  let AppElement;

  beforeEach(() => {
    const store = configureStore();
    store.dispatch(pushState(null, 'tech2016'));
    AppElement = createComponent(App, {store: configureStore()});
  });

  it('It should render as a react element', () => {
    expect(TestUtils.isElement(AppElement));
  });
});
