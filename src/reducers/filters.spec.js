/*eslint-env node, mocha */
/*global expect */
import filters from './filters';
import * as actions from '../actions';
import radarContainers from '../content';
import getAllRadarPoints from '../lib/getAllRadarPoints';

//TODO: this is not very pretty
import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';
const routeToRadarAction = {
  type: ROUTER_DID_CHANGE,
  payload: {
    params: {
      radarId: 'tech2016'
    }
  }
};
const radar = radarContainers['tech2016'];
const allPoints = getAllRadarPoints(radar);
const allPointIds = allPoints.map(p => p.id);

describe('filters reducer', () => {

  it('should initialize with zero filters', () => {
    const action = { type: 'nop' };
    const state = filters(undefined, action);

    expect(state.tags).to.deep.equal([]);
    expect(state.query).to.equal('');
    expect(state.favorites).to.equal(false);
  });

  xit('should return all points with no filters applied', () => {
    const state = filters(undefined, routeToRadarAction);

    expect(state.points).to.have.length.above(10);
    expect(state.points).to.deep.equal(allPointIds);
  });

  xit('should apply given tag filter', () => {
    const applyFilterAction = actions.addTagFilter('Verktøy');
    const state = filters(undefined, routeToRadarAction);
    const newState = filters(state, applyFilterAction);

    expect(newState.tags).to.deep.equal(['Verktøy']);
    expect(newState.points).to.have.length.above(0);
    expect(newState.points.length).to.not.equal(allPointIds);
    expect(newState.points).to.contain('sketch');
    expect(newState.points).to.not.contain('guerillatesting');
  });

  it('should remove a tag filter', () => {
    const applyFilterAction = actions.addTagFilter('Verktøy');
    const state = filters(undefined, routeToRadarAction);
    const newState = filters(state, applyFilterAction);

    expect(newState.tags).to.deep.equal(['Verktøy']);

    const finalState = filters(newState, actions.removeTagFilter('Verktøy'));

    expect(finalState.tags).to.deep.equal([]);
  });

  it('should apply given query filter', () => {
    const applyFilterAction = actions.setSearchQuery('Kunde');
    const state = filters(undefined, routeToRadarAction);
    const newState = filters(state, applyFilterAction);

    expect(newState.query).to.equal('Kunde');
  });

  it('should be able to reset all filters', () => {
    let state = filters(undefined, routeToRadarAction);
    state = filters(state, actions.setSearchQuery('Kunde'));
    state = filters(state, actions.addTagFilter('Verktøy'));
    state = filters(state, actions.addFavoritesFilter());

    expect(state.query).to.equal('Kunde');
    expect(state.tags).to.deep.equal(['Verktøy']);
    expect(state.favorites).to.equal(true);

    state = filters(state, actions.resetFilter());

    expect(state.query).to.equal('');
    expect(state.tags).to.deep.equal([]);
    expect(state.favorites).to.deep.equal(false);
  });

  it('can add and remove favorites filter', () => {
    let state = filters(undefined, routeToRadarAction);
    expect(state.favorites).to.equal(false);

    state = filters(state, actions.addFavoritesFilter());
    expect(state.favorites).to.equal(true);

    state = filters(state, actions.removeFavoritesFilter());
    expect(state.favorites).to.equal(false);
  });

  it('can restore filters', () => {
    const filtersToRestore = { favorites: true };
    expect(filters(undefined, actions.restoreFilters(filtersToRestore)))
      .to.deep.equal({favorites: true});
  });

});
