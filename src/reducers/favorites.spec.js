/*eslint-env node, mocha */
/*global expect */
import favorites from './favorites';
import { addFavorite, removeFavorite, restoreFavorites } from '../actions';

describe('favorites reducer', () => {
  it('should initialize with zero favorites', () => {
    const action = { type: 'nop' };
    expect(favorites(undefined, action)).to.deep.equal({});
  });

  it('should be able to add favorites', () => {
    const point = {
      id: 'test'
    };
    const action = addFavorite(point);
    expect(favorites(undefined, action)).to.deep.equal({test: true});
  });

  it('should be able to remove favorites', () => {
    const point = {
      id: 'bar'
    };
    const initialState = { foo: true, bar: true };
    const action = removeFavorite(point);
    expect(favorites(initialState, action)).to.deep.equal({foo: true});
  });

  it('can restore favorites', () => {
    const favoritesToRestore = { 'foo': true, 'bar': true };
    expect(favorites(undefined, restoreFavorites(favoritesToRestore)))
      .to.deep.equal({foo: true, bar: true});
  });
});
