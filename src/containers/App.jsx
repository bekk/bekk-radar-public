import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState, replaceState } from 'redux-router';
import Radar from '../components/Radar';
import * as actions from '../actions';
import extend from 'lodash/object/extend';
import { allPointsFilterStatusSelector, radarSelector, pointIdSelector } from '../selectors';

import 'normalize.css';
import 'styles/App.styl';

class App extends Component {

  static propTypes = {
    radar: PropTypes.object,
    filterMenu: PropTypes.object.isRequired,
    filteredPointIds: PropTypes.array,
    filters : PropTypes.object.isRequired,
    selectedPoint : PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    params: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    replaceState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    pointId: PropTypes.string,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  render() {
    // Injected by connect() call:
    const {
      filters,
      filterMenu,
      actions,
      allPointsFilterStatus,
      radar,
      pointId,
      selectedPoint,
      params: {
        categoryId
      }
    } = this.props;

    return (
      <Radar
        radar={radar}
        categoryId={categoryId}
        pointId={pointId}
        filters={filters}
        allPointsFilterStatus={allPointsFilterStatus}
        filterMenu={filterMenu}
        selectedPoint={selectedPoint}
        actions={extend({
          handlePointDismissed: this.handlePointDismissed
        }, actions)}
      />
    );
  }

  handlePointDismissed = () => {
    const { radar, actions } = this.props;
    const category = radar.categories[this.props.params.categoryId];

    actions.dismissPoint(category);
  };

}

const mapStateToProps = (state) => ({
  filterMenu: state.filterMenu,
  filters: state.filters,
  selectedPoint: state.selectedPoint,
  pointId: pointIdSelector(state),
  radar: radarSelector(state),
  allPointsFilterStatus: allPointsFilterStatusSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  pushState: (state,pathName,query) => dispatch(pushState(state,pathName,query)),
  replaceState: (state,pathName,query) => dispatch(replaceState(state,pathName,query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
