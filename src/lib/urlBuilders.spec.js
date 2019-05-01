/*eslint-env node, mocha */
/*global expect */
import {
  buildUrlToRadar,
  buildUrlToCategory,
  buildUrlToPoint,
  buildUrlToIndex
} from './urlBuilders';

describe('urlBuilders', () => {
  it('builds urls to index', () => {
    expect(buildUrlToIndex()).to.equal('/');
  });

  it('builds urls to radars', () => {
    const radar = {
      id: 'tech2015'
    };
    expect(buildUrlToRadar(radar)).to.equal('/tech2015');
  });

  it('builds urls to categories', () => {
    const radarId = 'tech2015';
    const categoryId = 'forsta';
    const url = buildUrlToCategory(radarId, categoryId);
    expect(url).to.equal('/tech2015/forsta');
  });

  it('builds urls to points', () => {
    const point = {
      id: 'sketch',
      categoryId: 'skape',
      radarId: 'tech2015'
    };
    expect(buildUrlToPoint(point)).to.equal('/tech2015/skape/sketch');
  });
});
