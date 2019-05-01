import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools';

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={{height: '100%'}}>
          <ReduxRouter />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
